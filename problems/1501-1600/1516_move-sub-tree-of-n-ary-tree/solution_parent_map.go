func moveSubTree(root *Node, p *Node, q *Node) *Node {
	// Pass one records every node's parent in a registry keyed by value
	// (the values are unique; the root has no entry); pass two probes p's
	// subtree for q. The surgery is the same three edits either way --
	// the registry is what answers the lookups.
	parent := map[int]*Node{}
	stack := []*Node{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, child := range node.Children {
			parent[child.Val] = node
			stack = append(stack, child)
		}
	}
	below := false
	probe := []*Node{p}
	for len(probe) > 0 {
		node := probe[len(probe)-1]
		probe = probe[:len(probe)-1]
		if node == q {
			below = true
			break
		}
		probe = append(probe, node.Children...)
	}
	// p already hangs exactly where the move wants it: nothing to do.
	for _, child := range q.Children {
		if child == p {
			return root
		}
	}
	if below {
		q_parent := parent[q.Val]
		q_parent.Children = drop_child(q_parent.Children, q)
		holder, rooted := parent[p.Val]
		if !rooted { // p is the root: q takes over
			q.Children = append(q.Children, p)
			return q
		}
		holder.Children[index_of(holder.Children, p)] = q
		q.Children = append(q.Children, p)
		return root
	}
	p_parent := parent[p.Val]
	p_parent.Children = drop_child(p_parent.Children, p)
	q.Children = append(q.Children, p)
	return root
}

// drop_child removes node from list, keeping the order of the rest.
func drop_child(list []*Node, node *Node) []*Node {
	i := index_of(list, node)
	return append(list[:i:i], list[i+1:]...)
}

// index_of returns the position of node in list.
func index_of(list []*Node, node *Node) int {
	for i, item := range list {
		if item == node {
			return i
		}
	}
	return -1
}
