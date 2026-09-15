package main

import "container/heap"

// A used set, a fresh-number counter, and a released min-heap: get()
// pops the smallest released number before minting a fresh one, so the
// smallest available number always comes out; release() is a no-op on an
// available number.
type PhoneDirectory struct {
	limit    int
	next     int
	used     map[int]bool
	released releasedHeap
}

type releasedHeap []int

func (h releasedHeap) Len() int           { return len(h) }
func (h releasedHeap) Less(a, b int) bool { return h[a] < h[b] }
func (h releasedHeap) Swap(a, b int)      { h[a], h[b] = h[b], h[a] }
func (h *releasedHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}
func (h *releasedHeap) Pop() interface{} {
	old := *h
	item := old[len(old)-1]
	*h = old[:len(old)-1]
	return item
}

func NewPhoneDirectoryTyped(maxNumbers int) *PhoneDirectory {
	return &PhoneDirectory{limit: maxNumbers, used: make(map[int]bool)}
}

func (design *PhoneDirectory) get() int {
	if design.released.Len() > 0 {
		// Every released number is smaller than every fresh one, so the
		// heap's minimum is the smallest available number.
		number := heap.Pop(&design.released).(int)
		design.used[number] = true
		return number
	}
	if design.next < design.limit {
		// Fresh numbers are minted in ascending order, so the counter
		// itself needs no bookkeeping.
		number := design.next
		design.next++
		design.used[number] = true
		return number
	}
	return -1
}

func (design *PhoneDirectory) check(number int) bool {
	return !design.used[number]
}

func (design *PhoneDirectory) release(number int) {
	if design.used[number] {
		// The used-set guard makes releasing an available number a no-op,
		// so a number never enters the heap twice.
		delete(design.used, number)
		heap.Push(&design.released, number)
	}
}
