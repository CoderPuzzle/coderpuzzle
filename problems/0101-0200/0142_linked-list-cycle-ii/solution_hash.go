type cycleListNode struct {
	val  int
	next *cycleListNode
}

func detectCycle(values []int, pos int) int {
	if len(values) == 0 {
		return -1
	}
	// Materialize the wire form: one node per value, tail back to pos.
	nodes := make([]*cycleListNode, len(values))
	for i, v := range values {
		nodes[i] = &cycleListNode{val: v}
	}
	for i := 0; i+1 < len(nodes); i++ {
		nodes[i].next = nodes[i+1]
	}
	if pos != -1 {
		nodes[len(nodes)-1].next = nodes[pos]
	}
	// Walk from the head remembering every node by address. The first node
	// to come around a second time is the cycle's entry; running off the
	// end instead means no cycle.
	seen := make(map[*cycleListNode]bool)
	node := nodes[0]
	for node != nil && !seen[node] {
		seen[node] = true
		node = node.next
	}
	if node == nil {
		return -1
	}
	// The judge wants an index: count steps from the head to the entry.
	index := 0
	entry := nodes[0]
	for entry != node {
		entry = entry.next
		index++
	}
	return index
}
