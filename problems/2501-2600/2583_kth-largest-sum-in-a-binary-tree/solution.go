import "sort"

// A breadth-first sweep swaps in one slice per level and never recurses:
// a degenerate tree runs 10^5 nodes deep. Each level's sum tops out at
// 10^5 * 10^6 = 10^11, past the 32-bit range, so the accumulator is an
// int64.
func kthLargestLevelSum(root *TreeNode, k int) int64 {
	sums := []int64{}
	level := []*TreeNode{root}
	for len(level) > 0 {
		next := []*TreeNode{}
		var total int64
		for _, node := range level {
			total += int64(node.Val)
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		sums = append(sums, total)
		level = next
	}
	if len(sums) < k {
		return -1
	}
	sort.Slice(sums, func(a, b int) bool { return sums[a] > sums[b] })
	return sums[k-1]
}
