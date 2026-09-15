// Rerooting is a walk, not a rebuild: the rule names, for every node on
// the leaf-to-root path, exactly which pointers move. One descent first
// records each node's parent, keyed by value (values are unique, so the
// first node met with the leaf's value is the leaf itself) — the parent
// pointers the statement demands, kept in the solver's own map. Then the
// two steps are applied bottom-up, stopping before the root: clear the
// parent's downward pointer (emptying the slot the moved subtree needs),
// move a surviving left child across to the right, and attach the parent
// as the new left child. The leaf the walk started from is the new root.
func flipBinaryTree(root *TreeNode, leaf int) *TreeNode {
	parent := map[int]*TreeNode{root.Val: nil}
	var target *TreeNode
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		if node.Val == leaf {
			target = node
		}
		for _, child := range []*TreeNode{node.Right, node.Left} {
			if child != nil {
				parent[child.Val] = node
				pending = append(pending, child)
			}
		}
	}
	cur := target
	for parent[cur.Val] != nil {
		above := parent[cur.Val]
		if above.Left == cur {
			above.Left = nil
		} else if above.Right == cur {
			above.Right = nil
		}
		if cur.Left != nil {
			cur.Right = cur.Left
		}
		cur.Left = above
		cur = above
	}
	return target
}
