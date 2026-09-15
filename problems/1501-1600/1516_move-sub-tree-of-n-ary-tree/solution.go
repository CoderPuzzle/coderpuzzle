func moveSubTree(root *Node, p *Node, q *Node) *Node {
	// One sweep gathers the facts the rewiring needs: p's parent, q's
	// parent, and whether q sits inside p's subtree -- depth counts how
	// many levels below p the walk currently is (0 means outside).
	type frame struct {
		node   *Node
		parent *Node
		depth  int
	}
	var p_parent, q_parent *Node
	q_below := false
	stack := []frame{{root, nil, 0}}
	for len(stack) > 0 {
		cur := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if cur.node == p {
			p_parent = cur.parent
		}
		if cur.node == q {
			q_parent = cur.parent
			q_below = cur.depth > 0
		}
		next := 0
		if cur.depth > 0 || cur.node == p {
			next = cur.depth + 1
		}
		for _, child := range cur.node.Children {
			stack = append(stack, frame{child, cur.node, next})
		}
	}
	// p already hangs exactly where the move wants it: nothing to do.
	for _, child := range q.Children {
		if child == p {
			return root
		}
	}
	if q_below {
		// Case 1: q travels inside p's subtree, so free q and re-hang it
		// where p stood -- in p's parent's children list, or at the root
		// when p is the root -- before p becomes q's last child.
		q_parent.Children = drop_child(q_parent.Children, q)
		if p_parent == nil {
			q.Children = append(q.Children, p)
			return q
		}
		p_parent.Children[index_of(p_parent.Children, p)] = q
		q.Children = append(q.Children, p)
		return root
	}
	// Cases 2 and 3: a plain re-attachment of p (with its subtree).
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
