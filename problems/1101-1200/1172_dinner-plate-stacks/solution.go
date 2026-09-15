package main

import "container/heap"

type indexHeap []int

func (h indexHeap) Len() int           { return len(h) }
func (h indexHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h indexHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *indexHeap) Push(value any)    { *h = append(*h, value.(int)) }
func (h *indexHeap) Pop() any {
	old := *h
	last := old[len(old)-1]
	*h = old[:len(old)-1]
	return last
}

type DinnerPlates struct {
	capacity int
	stacks   [][]int
	vacant   indexHeap
}

func NewDinnerPlatesTyped(capacity int) *DinnerPlates {
	design := &DinnerPlates{capacity: capacity}
	heap.Init(&design.vacant)
	return design
}

func (design *DinnerPlates) push(val int) {
	for design.vacant.Len() > 0 {
		index := design.vacant[0]
		if index >= len(design.stacks) || len(design.stacks[index]) == design.capacity {
			heap.Pop(&design.vacant)
		} else {
			break
		}
	}
	if design.vacant.Len() > 0 {
		index := heap.Pop(&design.vacant).(int)
		design.stacks[index] = append(design.stacks[index], val)
		if len(design.stacks[index]) < design.capacity {
			heap.Push(&design.vacant, index)
		}
	} else if len(design.stacks) > 0 && len(design.stacks[len(design.stacks)-1]) < design.capacity {
		last := len(design.stacks) - 1
		design.stacks[last] = append(design.stacks[last], val)
	} else {
		design.stacks = append(design.stacks, []int{val})
	}
}

func (design *DinnerPlates) pop() int {
	for len(design.stacks) > 0 && len(design.stacks[len(design.stacks)-1]) == 0 {
		design.stacks = design.stacks[:len(design.stacks)-1]
	}
	if len(design.stacks) == 0 {
		return -1
	}
	last := len(design.stacks) - 1
	value := design.stacks[last][len(design.stacks[last])-1]
	design.stacks[last] = design.stacks[last][:len(design.stacks[last])-1]
	return value
}

func (design *DinnerPlates) popAtStack(index int) int {
	if index < 0 || index >= len(design.stacks) || len(design.stacks[index]) == 0 {
		return -1
	}
	value := design.stacks[index][len(design.stacks[index])-1]
	design.stacks[index] = design.stacks[index][:len(design.stacks[index])-1]
	heap.Push(&design.vacant, index)
	return value
}
