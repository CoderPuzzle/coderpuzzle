func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	// One walk over the tree records every node's parent. Values are
	// unique, so a value identifies its node; the root records none.
	parent := map[int]int{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, child := range []*TreeNode{node.Left, node.Right} {
			if child != nil {
				parent[child.Val] = node.Val
				stack = append(stack, child)
			}
		}
	}
	// Every node on the root-to-p chain, p and root included, is a shared
	// ancestor candidate: it is an ancestor of p by construction.
	ancestors := map[int]bool{}
	for value := p; ; {
		ancestors[value] = true
		if value == root.Val {
			break
		}
		value = parent[value]
	}
	// Climb from q: the first candidate met is the deepest node whose
	// subtree covers both targets.
	value := q
	for !ancestors[value] {
		value = parent[value]
	}
	return value
}
