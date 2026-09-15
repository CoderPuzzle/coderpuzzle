package main

import "container/heap"

type indexHeap []int

func (h indexHeap) Len() int            { return len(h) }
func (h indexHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h indexHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *indexHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *indexHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

type NumberContainers struct {
	// index -> number currently filling it
	slots map[int]int
	// number -> every index ever filled with it; stale entries are
	// discarded only when find() reaches them
	candidates map[int]*indexHeap
}

func NewNumberContainersTyped() *NumberContainers {
	return &NumberContainers{
		slots:      make(map[int]int),
		candidates: make(map[int]*indexHeap),
	}
}

func (design *NumberContainers) change(index int, number int) {
	if current, exists := design.slots[index]; exists && current == number {
		return
	}
	design.slots[index] = number
	heapOfNumber := design.candidates[number]
	if heapOfNumber == nil {
		heapOfNumber = &indexHeap{}
		design.candidates[number] = heapOfNumber
	}
	heap.Push(heapOfNumber, index)
}

func (design *NumberContainers) find(number int) int {
	heapOfNumber := design.candidates[number]
	if heapOfNumber == nil {
		return -1
	}
	// the top is the answer unless that index has since been refilled
	for heapOfNumber.Len() > 0 && design.slots[(*heapOfNumber)[0]] != number {
		heap.Pop(heapOfNumber)
	}
	if heapOfNumber.Len() == 0 {
		return -1
	}
	return (*heapOfNumber)[0]
}
