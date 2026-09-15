func averageOfSubtree(root *TreeNode) int {
	type frame struct {
		node    *TreeNode
		visited bool
	}
	stack := []frame{{root, false}}
	sums := make(map[*TreeNode]int64)
	sizes := make(map[*TreeNode]int)
	count := 0
	for len(stack) > 0 {
		f := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if f.node == nil {
			continue
		}
		if f.visited {
			var s int64 = int64(f.node.Val)
			n := 1
			if f.node.Left != nil {
				s += sums[f.node.Left]
				n += sizes[f.node.Left]
			}
			if f.node.Right != nil {
				s += sums[f.node.Right]
				n += sizes[f.node.Right]
			}
			sums[f.node] = s
			sizes[f.node] = n
			if s/int64(n) == int64(f.node.Val) {
				count++
			}
		} else {
			stack = append(stack, frame{f.node, true})
			if f.node.Left != nil {
				stack = append(stack, frame{f.node.Left, false})
			}
			if f.node.Right != nil {
				stack = append(stack, frame{f.node.Right, false})
			}
		}
	}
	return count
}
