// A frame carries a node, the remaining sum before paying for it, and the
// path-buffer length on entry — popping it later truncates the buffer back to
// that prefix, which is the backtracking a recursive stack performs.
type frame struct {
	node      *TreeNode
	remaining int
	depth     int
}

func pathSum(root *TreeNode, targetSum int) [][]int {
	result := [][]int{}
	if root == nil {
		// The empty tree has no root-to-leaf paths at all.
		return result
	}
	// `path` is one shared buffer: every accepted path is a copy, and the
	// walk truncates the buffer back instead of rebuilding it per node.
	path := []int{}
	// Preorder with an explicit stack — the same shape in every language,
	// chosen because recursion would overflow Python's call-stack limit
	// on a 5000-node chain.
	stack := []frame{{root, targetSum, 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		path = path[:top.depth]
		path = append(path, top.node.Val)
		remaining := top.remaining - top.node.Val
		if top.node.Left == nil && top.node.Right == nil {
			if remaining == 0 {
				// A leaf whose root-to-leaf sum is on target: record a
				// copy, since `path` keeps mutating after this point.
				match := make([]int, len(path))
				copy(match, path)
				result = append(result, match)
			}
			continue
		}
		// Push the right child first so the left subtree is popped first:
		// matching paths are discovered in preorder, left to right.
		if top.node.Right != nil {
			stack = append(stack, frame{top.node.Right, remaining, top.depth + 1})
		}
		if top.node.Left != nil {
			stack = append(stack, frame{top.node.Left, remaining, top.depth + 1})
		}
	}
	return result
}
