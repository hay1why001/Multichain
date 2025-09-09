// programs/multichain_marketplace/src/lib.rs

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        create_metadata_accounts_v3, CreateMetadataAccountsV3,
        mpl_token_metadata::types::DataV2,
    },
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata; // <-- THE CRITICAL FIX IS HERE

declare_id!("5RoojTEGmhP4tuB8rR47TE135JSpETh16t6b22cU4UMj");

// ----------------------------
// ACCOUNTS
// ----------------------------

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        init,
        payer = payer,
        mint::decimals = 0,
        mint::authority = payer.key(),
        mint::freeze_authority = payer.key(),
    )]
    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer,
    )]
    pub token_account: Account<'info, TokenAccount>,

    /// CHECK: Metadata PDA derived with seeds
     #[account(
        mut,
        seeds = [b"metadata", mpl_token_metadata::ID.as_ref(), mint.key().as_ref()],
        bump,
        seeds::program = metadata_program.key(), // <-- THE CRITICAL FIX IS HERE
    )]
    pub metadata: UncheckedAccount<'info>,

    // Programs
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub metadata_program: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,

    // Sysvars
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct ListItem<'info> {
    #[account(
        init,
        payer = seller,
        space = 8 + 32 + 32 + 8 + 1
    )]
    pub listing_account: Account<'info, Listing>,

    #[account(mut)]
    pub seller: Signer<'info>,

    /// CHECK: We don’t derive accounts for Mint here, just validate externally
    pub mint: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct BuyItem<'info> {
    #[account(mut)]
    pub listing_account: Account<'info, Listing>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    /// CHECK: Seller account, just receiving SOL
    #[account(mut)]
    pub seller: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

// ----------------------------
// STATE
// ----------------------------

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub mint: Pubkey,
    pub price: u64,
    pub active: bool,
}

// ----------------------------
// PROGRAM LOGIC
// ----------------------------

#[program]
pub mod multichain_marketplace {
    use super::*;

    pub fn mint_nft(
        ctx: Context<MintNft>,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        // Mint 1 token
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.payer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        mint_to(cpi_ctx, 1)?;

        // Create the metadata account
        let cpi_ctx = CpiContext::new(
            ctx.accounts.metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                mint_authority: ctx.accounts.payer.to_account_info(),
                payer: ctx.accounts.payer.to_account_info(),
                update_authority: ctx.accounts.payer.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        );

        let data_v2 = DataV2 {
            name,
            symbol,
            uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        create_metadata_accounts_v3(
            cpi_ctx,
            data_v2,
            true, // is_mutable
            true, // update_authority_is_signer
            None, // collection_details
        )?;

        Ok(())
    }

    pub fn list_item(ctx: Context<ListItem>, price: u64) -> Result<()> {
        let listing = &mut ctx.accounts.listing_account;
        listing.seller = *ctx.accounts.seller.key;
        listing.mint = *ctx.accounts.mint.key;
        listing.price = price;
        listing.active = true;

        msg!("Item listed by {} for {} lamports", listing.seller, listing.price);
        Ok(())
    }

    pub fn buy_item(ctx: Context<BuyItem>) -> Result<()> {
        let listing = &mut ctx.accounts.listing_account;
        require!(listing.active, ErrorCode::ListingNotActive);

        let buyer = &ctx.accounts.buyer;
        let seller = &ctx.accounts.seller;

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            buyer.key,
            seller.key,
            listing.price,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                buyer.to_account_info(),
                seller.to_account_info(),
            ],
        )?;

        listing.active = false;

        msg!("Item bought by {}", buyer.key());
        Ok(())
    }
}

// ----------------------------
// ERRORS
// ----------------------------

#[error_code]
pub enum ErrorCode {
    #[msg("This listing is not active.")]
    ListingNotActive,
}