package main

type AuctionSystem struct{}

func NewAuctionSystemTyped() *AuctionSystem {
	panic("TODO")
}

func (design *AuctionSystem) addBid(userId int, itemId int, bidAmount int) {
	panic("TODO")
}

func (design *AuctionSystem) updateBid(userId int, itemId int, newAmount int) {
	panic("TODO")
}

func (design *AuctionSystem) removeBid(userId int, itemId int) {
	panic("TODO")
}

func (design *AuctionSystem) getHighestBidder(itemId int) int {
	panic("TODO")
}
