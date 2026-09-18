package main

import "container/heap"

// Min-heap of ints: both halves use it — the smaller half stores negated
// values, so its top is the largest of the small half.
type intMinHeap []int

func (h intMinHeap) Len() int           { return len(h) }
func (h intMinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h intMinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *intMinHeap) Push(value any)    { *h = append(*h, value.(int)) }
func (h *intMinHeap) Pop() any {
	old := *h
	last := len(old) - 1
	value := old[last]
	*h = old[:last]
	return value
}

// MedianFinder keeps two heaps around the median: a max-heap (via
// negation) holding the smaller half and a min-heap holding the larger
// half. The halves stay within one element of each other, so the median is
// either the small half's top (odd count) or the average of both tops.
type MedianFinder struct {
	low  intMinHeap // smaller half, min-heap of negated values
	high intMinHeap // larger half, min-heap
}

func NewMedianFinderTyped() *MedianFinder {
	return &MedianFinder{}
}

func (design *MedianFinder) addNum(num int) {
	heap.Push(&design.low, -num)
	// Route through both heaps: the largest of the small half crosses
	// over, then rebalance if the large half grew too big.
	heap.Push(&design.high, -heap.Pop(&design.low).(int))
	if design.high.Len() > design.low.Len() {
		heap.Push(&design.low, -heap.Pop(&design.high).(int))
	}
}

func (design *MedianFinder) findMedian() float64 {
	if design.low.Len() > design.high.Len() {
		return float64(-design.low[0])
	}
	return (float64(-design.low[0]) + float64(design.high[0])) / 2
}
