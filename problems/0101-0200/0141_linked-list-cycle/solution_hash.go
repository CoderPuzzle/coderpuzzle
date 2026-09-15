type cycleListNode struct {
	val  int
	next *cycleListNode
}

func hasCycle(values []int, pos int) bool {
	if len(values) == 0 {
		// Empty input is acyclic by convention.
		return false
	}
	// Materialize the wire form: one node per value, then link in order.
	nodes := make([]*cycleListNode, len(values))
	for i, v := range values {
		nodes[i] = &cycleListNode{val: v}
	}
	for i := 0; i+1 < len(nodes); i++ {
		nodes[i].next = nodes[i+1]
	}
	// Point the tail back at index pos to close the cycle.
	if pos != -1 {
		nodes[len(nodes)-1].next = nodes[pos]
	}
	// Walk from the head remembering every node by address; a cycle traps
	// the walk, so the first node to come around a second time proves it.
	seen := make(map[*cycleListNode]bool)
	node := nodes[0]
	for node != nil {
		if seen[node] {
			return true
		}
		seen[node] = true
		node = node.next
	}
	// The walk ran off the end of the list: no cycle.
	return false
}
