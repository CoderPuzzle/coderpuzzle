func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	// The original hands p and q as node references that each carry a
	// parent pointer, with no root given at all. Here the tree arrives
	// as root plus the two target values instead, so the first step
	// recovers what parent would have given directly: one iterative
	// pre-order pass builds a value -> parent-value map. Node values are
	// unique, so a value is a safe, hashable key.
	parentOf := map[int]int{}
	hasParent := map[int]bool{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node.Left != nil {
			parentOf[node.Left.Val] = node.Val
			hasParent[node.Left.Val] = true
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			parentOf[node.Right.Val] = node.Val
			hasParent[node.Right.Val] = true
			stack = append(stack, node.Right)
		}
	}
	// Walk p up to the root, collecting every value on that path —
	// exactly the "store the path from p" step the original hints at.
	ancestors := map[int]bool{}
	val := p
	for {
		ancestors[val] = true
		if !hasParent[val] {
			break
		}
		val = parentOf[val]
	}
	// Walk q up until it lands on a value already seen from p; that is
	// the lowest shared ancestor. This also handles either target
	// already being the other's ancestor, since the starting value is
	// checked before climbing.
	val = q
	for !ancestors[val] {
		val = parentOf[val]
	}
	return val
}
