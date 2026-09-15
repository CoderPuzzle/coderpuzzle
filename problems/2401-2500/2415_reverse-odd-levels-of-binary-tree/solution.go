func reverseOddLevels(root *TreeNode) *TreeNode {
	// Only values move — children stay attached — so reversing an odd
	// level means writing its value list back mirrored: first position
	// takes the last value, and so on inward. A frontier of nodes starts
	// at the root and steps down one level per round, mirroring each odd
	// level's values on arrival. The tree is perfect, so one nil check
	// per node pair keeps the frontier free of nils past the last level.
	row := []*TreeNode{root}
	for depth := 0; len(row) > 0; depth++ {
		if depth%2 == 1 {
			values := make([]int, len(row))
			for index, node := range row {
				values[index] = node.Val
			}
			for index := range row {
				row[index].Val = values[len(row)-1-index]
			}
		}
		var next []*TreeNode
		for _, node := range row {
			if node.Left != nil {
				next = append(next, node.Left, node.Right)
			}
		}
		row = next
	}
	return root
}
