package main

// KthLargest keeps a min-heap holding exactly the k largest
// scores seen so far: the heap minimum is the kth largest element of the
// whole pool.
type KthLargest struct {
	k    int
	heap []int // hand-rolled binary min-heap (the design wrapper assembles
	// one source file, so the submission cannot import container/heap)
}

func NewKthLargestTyped(k int, nums []int) *KthLargest {
	tracker := &KthLargest{k: k, heap: append([]int(nil), nums...)}
	// heapify: sift each internal node down, bottom-up
	for index := len(tracker.heap)/2 - 1; index >= 0; index-- {
		tracker.siftDown(index)
	}
	for len(tracker.heap) > k {
		tracker.pop()
	}
	return tracker
}

func (design *KthLargest) add(val int) int {
	design.push(val)
	if len(design.heap) > design.k {
		design.pop()
	}
	return design.heap[0]
}

func (design *KthLargest) push(value int) {
	design.heap = append(design.heap, value)
	index := len(design.heap) - 1
	for index > 0 {
		parent := (index - 1) / 2
		if design.heap[index] >= design.heap[parent] {
			break
		}
		design.heap[index], design.heap[parent] = design.heap[parent], design.heap[index]
		index = parent
	}
}

func (design *KthLargest) pop() {
	last := len(design.heap) - 1
	design.heap[0] = design.heap[last]
	design.heap = design.heap[:last]
	design.siftDown(0)
}

func (design *KthLargest) siftDown(index int) {
	for {
		left := 2*index + 1
		if left >= len(design.heap) {
			return
		}
		smallest := left
		if right := left + 1; right < len(design.heap) && design.heap[right] < design.heap[left] {
			smallest = right
		}
		if design.heap[smallest] >= design.heap[index] {
			return
		}
		design.heap[index], design.heap[smallest] = design.heap[smallest], design.heap[index]
		index = smallest
	}
}
