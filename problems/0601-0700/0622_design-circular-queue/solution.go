package main

// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// the tail position is always derivable as (head + count) % k.
type MyCircularQueue struct {
	buf   []int
	head  int
	count int
}

func NewMyCircularQueueTyped(k int) *MyCircularQueue {
	return &MyCircularQueue{buf: make([]int, k)}
}

func (design *MyCircularQueue) enQueue(value int) bool {
	if design.count == len(design.buf) {
		return false
	}
	// The write slot is one past the current rear, modulo the ring.
	design.buf[(design.head+design.count)%len(design.buf)] = value
	design.count++
	return true
}

func (design *MyCircularQueue) deQueue() bool {
	if design.count == 0 {
		return false
	}
	// Nothing to erase: the old head slot is simply written over once
	// the ring wraps back to it.
	design.head = (design.head + 1) % len(design.buf)
	design.count--
	return true
}

func (design *MyCircularQueue) Front() int {
	if design.count == 0 {
		return -1
	}
	return design.buf[design.head]
}

func (design *MyCircularQueue) Rear() int {
	if design.count == 0 {
		return -1
	}
	return design.buf[(design.head+design.count-1)%len(design.buf)]
}

func (design *MyCircularQueue) isEmpty() bool {
	return design.count == 0
}

func (design *MyCircularQueue) isFull() bool {
	return design.count == len(design.buf)
}
