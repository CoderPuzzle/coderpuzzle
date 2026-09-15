package main

// A fixed buffer, a head index, and an occupied count: the count (not a
// tail index) distinguishes full from empty, so all k slots are usable;
// both ends are derivable, the rear sits at (head + count - 1) % k and
// the slot a front insert claims at (head - 1 + k) % k.
type MyCircularDeque struct {
	buf   []int
	head  int
	count int
}

func NewMyCircularDequeTyped(k int) *MyCircularDeque {
	return &MyCircularDeque{buf: make([]int, k)}
}

func (design *MyCircularDeque) insertFront(value int) bool {
	if design.count == len(design.buf) {
		return false
	}
	// Step head back one slot, modulo the ring, and write there.
	design.head = (design.head - 1 + len(design.buf)) % len(design.buf)
	design.buf[design.head] = value
	design.count++
	return true
}

func (design *MyCircularDeque) insertLast(value int) bool {
	if design.count == len(design.buf) {
		return false
	}
	// The write slot is one past the current rear, modulo the ring.
	design.buf[(design.head+design.count)%len(design.buf)] = value
	design.count++
	return true
}

func (design *MyCircularDeque) deleteFront() bool {
	if design.count == 0 {
		return false
	}
	// Nothing to erase: the old head slot is simply written over once
	// the ring wraps back to it.
	design.head = (design.head + 1) % len(design.buf)
	design.count--
	return true
}

func (design *MyCircularDeque) deleteLast() bool {
	if design.count == 0 {
		return false
	}
	// The rear slot is derivable, so retiring it is just a count.
	design.count--
	return true
}

func (design *MyCircularDeque) getFront() int {
	if design.count == 0 {
		return -1
	}
	return design.buf[design.head]
}

func (design *MyCircularDeque) getRear() int {
	if design.count == 0 {
		return -1
	}
	return design.buf[(design.head+design.count-1)%len(design.buf)]
}

func (design *MyCircularDeque) isEmpty() bool {
	return design.count == 0
}

func (design *MyCircularDeque) isFull() bool {
	return design.count == len(design.buf)
}
