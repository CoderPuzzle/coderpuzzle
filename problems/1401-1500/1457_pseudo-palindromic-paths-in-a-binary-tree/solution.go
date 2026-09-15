func pseudoPalindromicPaths(root *TreeNode) int {
	if root == nil {
		return 0
	}
	count := 0
	type frame struct {
		node *TreeNode
		mask int
	}
	// Explicit stack: the tree may be a chain 10^5 deep, too deep for
	// recursion under the small run-time stacks.
	stack := []frame{{root, 1 << (root.Val - 1)}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, mask := top.node, top.mask
		if node.Left == nil && node.Right == nil {
			// At most one set bit <=> at most one odd digit count.
			if mask&(mask-1) == 0 {
				count++
			}
			continue
		}
		if node.Left != nil {
			stack = append(stack, frame{node.Left, mask ^ (1 << (node.Left.Val - 1))})
		}
		if node.Right != nil {
			stack = append(stack, frame{node.Right, mask ^ (1 << (node.Right.Val - 1))})
		}
	}
	return count
}
