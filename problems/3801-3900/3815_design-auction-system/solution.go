package main

import "container/heap"

// Per item, a lazy-deletion max-heap of (-amount, -userId, seq) entries:
// the top is the live leader once every stale top has been popped. A seq
// map names the newest entry per (userId, itemId) pair, so addBid/updateBid
// just push a newer entry (the old one turns stale by its seq) and
// removeBid drops the pair. The heap orders by amount first, userId
// second, which is exactly the stated tie-break.
type auctionEntry struct {
	negAmount int64
	negUser   int64
	seq       int64
}

type auctionHeap []auctionEntry

func (h auctionHeap) Len() int { return len(h) }
func (h auctionHeap) Less(i, j int) bool {
	if h[i].negAmount != h[j].negAmount {
		return h[i].negAmount < h[j].negAmount
	}
	return h[i].negUser < h[j].negUser
}
func (h auctionHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *auctionHeap) Push(x any)   { *h = append(*h, x.(auctionEntry)) }
func (h *auctionHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type AuctionSystem struct {
	heaps     map[int]*auctionHeap
	latestSeq map[int64]int64
	clock     int64
}

func NewAuctionSystemTyped() *AuctionSystem {
	return &AuctionSystem{heaps: make(map[int]*auctionHeap), latestSeq: make(map[int64]int64)}
}

func (design *AuctionSystem) addBid(userId int, itemId int, bidAmount int) {
	design.push(userId, itemId, bidAmount)
}

func (design *AuctionSystem) updateBid(userId int, itemId int, newAmount int) {
	design.push(userId, itemId, newAmount)
}

func (design *AuctionSystem) removeBid(userId int, itemId int) {
	delete(design.latestSeq, auctionKey(userId, itemId))
}

func (design *AuctionSystem) getHighestBidder(itemId int) int {
	h := design.heaps[itemId]
	for h != nil && h.Len() > 0 {
		top := (*h)[0]
		if design.latestSeq[auctionKey(int(-top.negUser), itemId)] == top.seq {
			return int(-top.negUser)
		}
		heap.Pop(h)
	}
	return -1
}

func (design *AuctionSystem) push(userId int, itemId int, amount int) {
	design.clock++
	design.latestSeq[auctionKey(userId, itemId)] = design.clock
	h := design.heaps[itemId]
	if h == nil {
		h = &auctionHeap{}
		design.heaps[itemId] = h
	}
	heap.Push(h, auctionEntry{negAmount: int64(-amount), negUser: int64(-userId), seq: design.clock})
}

func auctionKey(userId int, itemId int) int64 {
	return int64(userId)<<16 | int64(itemId)
}
