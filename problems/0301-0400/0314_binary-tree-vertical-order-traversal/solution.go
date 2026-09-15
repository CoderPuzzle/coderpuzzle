func verticalOrder(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}
	// (node, column) pairs advance level by level: dequeue order is
	// top-to-bottom, and within a row left-to-right — exactly the ordering
	// the answer needs, so appending as we dequeue is enough.
	// Column index -> position of that column's slice in columns.
	index := make(map[int]int)
	columns := [][]int{}
	nodes := []*TreeNode{root}
	indices := []int{0}
	for len(nodes) > 0 {
		node := nodes[0]
		column := indices[0]
		nodes, indices = nodes[1:], indices[1:]
		if idx, ok := index[column]; ok {
			columns[idx] = append(columns[idx], node.Val)
		} else {
			index[column] = len(columns)
			columns = append(columns, []int{node.Val})
		}
		if node.Left != nil {
			nodes = append(nodes, node.Left)
			indices = append(indices, column-1)
		}
		if node.Right != nil {
			nodes = append(nodes, node.Right)
			indices = append(indices, column+1)
		}
	}
	// The visited columns form one contiguous range (columns only ever move
	// by one); walk it smallest to largest, since discovery order is not
	// left-to-right.
	leftmost, rightmost := 0, 0
	for column := range index {
		if column < leftmost {
			leftmost = column
		}
		if column > rightmost {
			rightmost = column
		}
	}
	out := make([][]int, 0, rightmost-leftmost+1)
	for column := leftmost; column <= rightmost; column++ {
		out = append(out, columns[index[column]])
	}
	return out
}
