func lowestCommonAncestor(root *TreeNode, p int, q int) *TreeNode {
	// Iterative pre-order build of a value -> parent-value map (and a
	// value -> node lookup) in one pass. Node values are unique, so a
	// value serves as a stable, hashable key everywhere. Once built, p
	// and q's presence is a plain membership check against nodeOf — this
	// is the existence check, done for free by the same walk that will
	// drive the LCA search.
	if root == nil {
		return nil
	}
	nodeOf := map[int]*TreeNode{}
	parentOf := map[int]int{}
	hasParent := map[int]bool{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		nodeOf[node.Val] = node
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
	if _, ok := nodeOf[p]; !ok {
		return nil
	}
	if _, ok := nodeOf[q]; !ok {
		return nil
	}
	// Walk p up to the root, collecting every value on that path.
	ancestors := map[int]bool{}
	val := p
	for {
		ancestors[val] = true
		if !hasParent[val] {
			break
		}
		val = parentOf[val]
	}
	// Walk q up until it lands on a value already seen from p; that is the
	// lowest shared ancestor (this also handles p == q and either one
	// already being the other's ancestor, since the starting value is
	// checked before climbing).
	val = q
	for !ancestors[val] {
		val = parentOf[val]
	}
	return nodeOf[val]
}
