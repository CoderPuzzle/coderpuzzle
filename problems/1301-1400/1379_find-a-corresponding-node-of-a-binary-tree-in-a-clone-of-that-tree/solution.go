// bundle-provided type (not editable here; the judge assembles its definition
// into every submission):
//   TreeNode:  { field Val int, Left/Right *TreeNode }

func getTargetCopy(original *TreeNode, cloned *TreeNode, target int) *TreeNode {
	// Parallel preorder: identical shapes keep every pair aligned.
	type pair struct{ orig, clone *TreeNode }
	stack := []pair{{original, cloned}}
	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if current.orig == nil {
			continue
		}
		if current.orig.Val == target {
			return current.clone
		}
		stack = append(stack, pair{current.orig.Left, current.clone.Left})
		stack = append(stack, pair{current.orig.Right, current.clone.Right})
	}
	return nil
}
