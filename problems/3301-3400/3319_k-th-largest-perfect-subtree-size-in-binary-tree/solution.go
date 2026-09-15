import "sort"

func kthLargestPerfectSubtree(root *TreeNode, k int) int {
	// One BFS pass records the nodes; walking that slice backwards visits
	// children before parents, so sizes propagate bottom-up with no
	// recursion — a chain can run 2000 nodes deep. info holds the subtree
	// size when the subtree is perfect, else 0: a perfect internal node
	// needs both children perfect with equal sizes, and a leaf is perfect
	// with size 1.
	order := []*TreeNode{root}
	for i := 0; i < len(order); i++ {
		if order[i].Left != nil {
			order = append(order, order[i].Left)
		}
		if order[i].Right != nil {
			order = append(order, order[i].Right)
		}
	}
	info := make(map[*TreeNode]int, len(order))
	sizes := []int{}
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		if node.Left == nil && node.Right == nil {
			info[node] = 1
		} else if node.Left != nil && node.Right != nil {
			left, right := info[node.Left], info[node.Right]
			if left > 0 && left == right {
				info[node] = 1 + left + right
			} else {
				info[node] = 0
			}
		} else {
			info[node] = 0
		}
		if info[node] > 0 {
			sizes = append(sizes, info[node])
		}
	}
	sort.Slice(sizes, func(a, b int) bool { return sizes[a] > sizes[b] })
	if k <= len(sizes) {
		return sizes[k-1]
	}
	return -1
}
