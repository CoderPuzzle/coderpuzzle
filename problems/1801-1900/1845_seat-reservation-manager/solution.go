package main

import "container/heap"

// Min-heap over the returned seats; Go's container/heap drives it.
type seatHeap []int

func (h seatHeap) Len() int           { return len(h) }
func (h seatHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h seatHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *seatHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *seatHeap) Pop() any {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

type SeatManager struct {
	// Largest seat number ever reserved: fresh seats march upward from here.
	nextSeat int
	// Min-heap holding ONLY currently returned seats — never the untouched ones.
	returned seatHeap
}

func NewSeatManagerTyped(n int) *SeatManager {
	return &SeatManager{nextSeat: 1, returned: seatHeap{}}
}

func (design *SeatManager) reserve() int {
	// Prefer the smallest returned seat; the top is always < nextSeat, so
	// the two sources of free seats never overlap.
	if design.returned.Len() > 0 && design.returned[0] < design.nextSeat {
		return heap.Pop(&design.returned).(int)
	}
	// No outstanding returns: the next fresh seat is simply nextSeat.
	seat := design.nextSeat
	design.nextSeat++
	return seat
}

func (design *SeatManager) unreserve(seat int) {
	// The monotone counter march is disrupted by exactly this one seat.
	heap.Push(&design.returned, seat)
}
