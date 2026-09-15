import "sort"

func levelMedian(root *TreeNode, level int) int {
	// Descend one frontier at a time: every pass replaces the current
	// level's nodes with their children, so after `level` passes the
	// frontier IS the queried level. If it empties first, that level
	// does not exist and -1 is the answer. Plain loops over an explicit
	// frontier — no recursion — so a 200,000-node chain is as safe as a
	// bushy tree.
	frontier := make([]*TreeNode, 0, 1)
	if root != nil {
		frontier = append(frontier, root)
	}
	for depth := 0; depth < level && len(frontier) > 0; depth++ {
		next := make([]*TreeNode, 0, 2*len(frontier))
		for _, node := range frontier {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		frontier = next
	}
	if len(frontier) == 0 {
		return -1
	}
	// The upper median sits at index len / 2 of the sorted level values:
	// the exact middle for odd counts, the larger of the two middle
	// elements for even counts.
	values := make([]int, len(frontier))
	for i, node := range frontier {
		values[i] = node.Val
	}
	sort.Ints(values)
	return values[len(values)/2]
}
