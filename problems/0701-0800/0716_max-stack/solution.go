package main

import "container/heap"

// A doubly-linked list of cells keeps stack order -- the tail is the top,
// so push, pop, and top touch only the tail cell -- while a max-heap of
// cells keyed by (value, sequence number) finds the maximum. Sequence
// numbers rise with every push and the heap prefers the larger one among
// equal values, so its root is the topmost duplicate maximum -- exactly the
// element popMax must remove. A removal elsewhere in the list leaves the
// cell's heap entry stale, so each cell carries a dead flag and
// peekMax/popMax discard roots that name a dead cell: every stale entry is
// skipped at most once.
type cell struct {
	value int
	seq   int
	prev  *cell
	next  *cell
	dead  bool
}

// cellHeap orders by value, then by sequence number, so the root names the
// topmost duplicate maximum.
type cellHeap []*cell

func (h cellHeap) Len() int            { return len(h) }
func (h cellHeap) Less(i, j int) bool  { return h.precedes(h[i], h[j]) }
func (h cellHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *cellHeap) Push(x interface{}) { *h = append(*h, x.(*cell)) }
func (h *cellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func (h cellHeap) precedes(a, b *cell) bool {
	if a.value != b.value {
		return a.value > b.value
	}
	return a.seq > b.seq
}

type MaxStack struct {
	tail *cell
	heap cellHeap
	seq  int
}

func NewMaxStackTyped() *MaxStack {
	return &MaxStack{heap: cellHeap{}}
}

func (design *MaxStack) push(x int) {
	design.seq++
	item := &cell{value: x, seq: design.seq, prev: design.tail}
	if design.tail != nil {
		design.tail.next = item
	}
	design.tail = item
	heap.Push(&design.heap, item)
}

func (design *MaxStack) pop() int {
	item := design.tail
	design.unlink(item)
	return item.value
}

func (design *MaxStack) top() int {
	return design.tail.value
}

func (design *MaxStack) peekMax() int {
	for design.heap[0].dead {
		heap.Pop(&design.heap)
	}
	return design.heap[0].value
}

func (design *MaxStack) popMax() int {
	for {
		item := heap.Pop(&design.heap).(*cell)
		if !item.dead {
			design.unlink(item)
			return item.value
		}
	}
}

func (design *MaxStack) unlink(item *cell) {
	if item.prev != nil {
		item.prev.next = item.next
	}
	if item.next != nil {
		item.next.prev = item.prev
	}
	if design.tail == item {
		design.tail = item.prev
	}
	item.dead = true
}
