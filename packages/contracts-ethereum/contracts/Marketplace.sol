// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 private _listingCounter;
    mapping(uint256 => Listing) public listings;
    
    uint256 public platformFeePercentage; // e.g., 250 for 2.5%

    event ItemListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    
    event ItemSold(
        uint256 indexed listingId,
        address indexed buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(uint256 _feePercentage) {
        platformFeePercentage = _feePercentage;
    }

    function listItem(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(nft.getApproved(tokenId) == address(this), "Marketplace not approved");

        _listingCounter++;
        uint256 listingId = _listingCounter;
        listings[listingId] = Listing(listingId, msg.sender, nftContract, tokenId, price, true);

        emit ItemListed(listingId, msg.sender, nftContract, tokenId, price);
    }

    function buyItem(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Not enough ETH sent");

        listing.active = false;
        
        uint256 platformFee = (listing.price * platformFeePercentage) / 10000;
        uint256 sellerProceeds = listing.price - platformFee;

        // Transfer NFT to buyer
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Pay seller
        (bool success, ) = listing.seller.call{value: sellerProceeds}("");
        require(success, "Failed to send ETH to seller");

        emit ItemSold(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);
    }
}