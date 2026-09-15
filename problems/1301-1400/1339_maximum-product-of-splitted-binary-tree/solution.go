func maxProduct(root *TreeNode) int {
	// Iterative post-order computes every subtree sum; each non-root sum s
	// scores the cut s * (total - s), maximized before the modulo.
	sums := map[*TreeNode]int64{}
	type frame struct {
		node     *TreeNode
		expanded bool
	}
	stack := []frame{{root, false}}
	for len(stack) > 0 {
		f := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if f.node == nil {
			continue
		}
		if f.expanded {
			var left, right int64
			if f.node.Left != nil {
				left = sums[f.node.Left]
			}
			if f.node.Right != nil {
				right = sums[f.node.Right]
			}
			sums[f.node] = int64(f.node.Val) + left + right
		} else {
			stack = append(stack, frame{f.node, true})
			stack = append(stack, frame{f.node.Left, false})
			stack = append(stack, frame{f.node.Right, false})
		}
	}
	total := sums[root]
	var best int64
	for node, part := range sums {
		if node != root {
			if product := part * (total - part); product > best {
				best = product
			}
		}
	}
	return int(best % 1000000007)
}
