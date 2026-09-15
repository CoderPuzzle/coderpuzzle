package main

import "math"

// The queue lives in consecutive blocks of about sqrt(n) slots: fetch
// walks the blocks, subtracting each size from k, to find the kth
// element, lifts it out of its own block, and re-appends it at the tail —
// an empty block is dropped, a full tail rolls the value into a fresh
// block.
type MRUQueue struct {
	blocks [][]int
	width  int
}

func NewMRUQueueTyped(n int) *MRUQueue {
	width := int(math.Sqrt(float64(n))) + 1
	blocks := make([][]int, 0, n/width+1)
	for start := 1; start <= n; start += width {
		end := start + width
		if end > n+1 {
			end = n + 1
		}
		block := make([]int, 0, width)
		for value := start; value < end; value++ {
			block = append(block, value)
		}
		blocks = append(blocks, block)
	}
	return &MRUQueue{blocks: blocks, width: width}
}

func (design *MRUQueue) fetch(k int) int {
	index := 0
	for k > len(design.blocks[index]) {
		k -= len(design.blocks[index])
		index++
	}
	block := design.blocks[index]
	value := block[k-1]
	block = append(block[:k-1], block[k:]...)
	design.blocks[index] = block
	if len(block) == 0 {
		design.blocks = append(design.blocks[:index], design.blocks[index+1:]...)
	}
	if len(design.blocks) == 0 || len(design.blocks[len(design.blocks)-1]) >= design.width {
		design.blocks = append(design.blocks, []int{value})
	} else {
		tail := len(design.blocks) - 1
		design.blocks[tail] = append(design.blocks[tail], value)
	}
	return value
}
