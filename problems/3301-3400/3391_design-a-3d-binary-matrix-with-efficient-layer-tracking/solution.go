package main

import (
	"container/heap"
)

type layerEntry struct {
	count int
	x     int
}

type layerHeap []layerEntry

func (h layerHeap) Len() int { return len(h) }

// Max-heap: the top is the largest count, ties broken toward the
// largest index.
func (h layerHeap) Less(i, j int) bool {
	if h[i].count != h[j].count {
		return h[i].count > h[j].count
	}
	return h[i].x > h[j].x
}

func (h layerHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *layerHeap) Push(x interface{}) { *h = append(*h, x.(layerEntry)) }
func (h *layerHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}

// Layer one-counts live in an array beside a max-heap of (count, x)
// pairs; every count change pushes a fresh pair, so the top always
// holds the largest live count with ties broken toward the larger
// index, and pairs left stale by later changes are discarded only when
// they surface at the top. The cell grid answers set and unset in O(1)
// and keeps repeated sets or unsets from skewing the counts. Each call
// costs O(log) heap work.
type Matrix3D struct {
	n      int
	counts []int
	cells  [][]byte
	heap   layerHeap
}

func NewMatrix3DTyped(n int) *Matrix3D {
	design := &Matrix3D{n: n, counts: make([]int, n), cells: make([][]byte, n)}
	for x := 0; x < n; x++ {
		design.cells[x] = make([]byte, n*n)
		heap.Push(&design.heap, layerEntry{count: 0, x: x})
	}
	return design
}

func (design *Matrix3D) setCell(x int, y int, z int) {
	if design.cells[x][y*design.n+z] == 1 {
		return
	}
	design.cells[x][y*design.n+z] = 1
	design.counts[x]++
	heap.Push(&design.heap, layerEntry{count: design.counts[x], x: x})
}

func (design *Matrix3D) unsetCell(x int, y int, z int) {
	if design.cells[x][y*design.n+z] == 0 {
		return
	}
	design.cells[x][y*design.n+z] = 0
	design.counts[x]--
	heap.Push(&design.heap, layerEntry{count: design.counts[x], x: x})
}

func (design *Matrix3D) largestMatrix() int {
	// The live pair of the true maximum is always present, so the
	// stale entries above it run out.
	for design.heap[0].count != design.counts[design.heap[0].x] {
		heap.Pop(&design.heap)
	}
	return design.heap[0].x
}
