package main

// A growable ring buffer with a head index and a count: both ends move
// modulo the ring, and a full buffer doubles, so every operation is O(1)
// amortized. Go carries no stdlib deque, so each half of the queue is one
// of these.
type deque struct {
	buf   []int
	head  int
	count int
}

func newDeque() *deque {
	return &deque{buf: make([]int, 4)}
}

func (d *deque) grow() {
	if d.count < len(d.buf) {
		return
	}
	next := make([]int, 2*len(d.buf))
	for i := 0; i < d.count; i++ {
		next[i] = d.buf[(d.head+i)%len(d.buf)]
	}
	d.buf = next
	d.head = 0
}

func (d *deque) pushFront(val int) {
	d.grow()
	d.head = (d.head - 1 + len(d.buf)) % len(d.buf)
	d.buf[d.head] = val
	d.count++
}

func (d *deque) pushBack(val int) {
	d.grow()
	d.buf[(d.head+d.count)%len(d.buf)] = val
	d.count++
}

func (d *deque) popFront() int {
	val := d.buf[d.head]
	d.head = (d.head + 1) % len(d.buf)
	d.count--
	return val
}

func (d *deque) popBack() int {
	d.count--
	return d.buf[(d.head+d.count)%len(d.buf)]
}

// Two deques split at the middle: front holds the first ceil(n/2)
// elements, back the rest, so the middle always sits at an end of each
// deque — balance restores the split after every mutating call.
type FrontMiddleBackQueue struct {
	front *deque
	back  *deque
}

func NewFrontMiddleBackQueueTyped() *FrontMiddleBackQueue {
	return &FrontMiddleBackQueue{front: newDeque(), back: newDeque()}
}

func (design *FrontMiddleBackQueue) pushFront(val int) {
	design.front.pushFront(val)
	design.balance()
}

func (design *FrontMiddleBackQueue) pushMiddle(val int) {
	// The new element must land one slot before the current back of
	// front (the frontmost middle of the result), so when front is the
	// bigger half, its last element moves to back first — pushBack then
	// writes exactly the middle slot.
	if design.front.count > design.back.count {
		design.back.pushFront(design.front.popBack())
	}
	design.front.pushBack(val)
}

func (design *FrontMiddleBackQueue) pushBack(val int) {
	design.back.pushBack(val)
	design.balance()
}

func (design *FrontMiddleBackQueue) popFront() int {
	if design.front.count == 0 {
		return -1
	}
	val := design.front.popFront()
	design.balance()
	return val
}

func (design *FrontMiddleBackQueue) popMiddle() int {
	// ceil(n/2) elements in front means the frontmost middle — the back
	// of front — at every length, odd or even.
	if design.front.count == 0 {
		return -1
	}
	val := design.front.popBack()
	design.balance()
	return val
}

func (design *FrontMiddleBackQueue) popBack() int {
	var val int
	if design.back.count > 0 {
		val = design.back.popBack()
	} else if design.front.count == 0 {
		return -1
	} else {
		val = design.front.popBack()
	}
	design.balance()
	return val
}

func (design *FrontMiddleBackQueue) balance() {
	if design.front.count > design.back.count+1 {
		design.back.pushFront(design.front.popBack())
	} else if design.front.count < design.back.count {
		design.front.pushBack(design.back.popFront())
	}
}
