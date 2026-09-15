import "container/heap"

// Heap entry: value, input position (the tie-break, which also keeps the
// ordering from ever looking at the nodes themselves), and the head.
type entry struct {
	val      int
	position int
	node     *ListNode
}

type headHeap []entry

func (h headHeap) Len() int { return len(h) }
func (h headHeap) Less(i, j int) bool {
	if h[i].val != h[j].val {
		return h[i].val < h[j].val
	}
	return h[i].position < h[j].position
}
func (h headHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *headHeap) Push(x interface{}) { *h = append(*h, x.(entry)) }
func (h *headHeap) Pop() interface{} {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

func mergeKLists(lists []*ListNode) *ListNode {
	// Min-heap holding each surviving list's current head, keyed by
	// (value, input position): the next node of the output is always the
	// smallest head, and each list keeps exactly one entry in the heap.
	heapEntries := &headHeap{}
	for position, head := range lists {
		if head != nil {
			*heapEntries = append(*heapEntries, entry{head.Val, position, head})
		}
	}
	heap.Init(heapEntries)
	// Dummy head: every attachment happens the same way and the real head
	// falls out as dummy.Next.
	dummy := &ListNode{Val: 0}
	tail := dummy
	for heapEntries.Len() > 0 {
		smallest := heap.Pop(heapEntries).(entry)
		tail.Next = smallest.node
		tail = smallest.node
		// The node's own list continues through its successor, which
		// re-enters the heap as that list's new single entry.
		if smallest.node.Next != nil {
			next := smallest.node.Next
			heap.Push(heapEntries, entry{next.Val, smallest.position, next})
		}
	}
	// Every list ran dry inside the loop, so the last attached node already
	// ends with nil and the chain is complete.
	return dummy.Next
}
