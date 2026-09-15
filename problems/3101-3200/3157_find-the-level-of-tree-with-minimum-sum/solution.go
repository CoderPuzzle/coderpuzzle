// One breadth-first pass groups nodes level by level; each level's sum
// competes against the running minimum with a strict less-than, so on a
// tie the earliest — lowest — level stays the answer. An explicit queue,
// never recursion: a skewed tree runs 10^5 nodes deep. Level sums reach
// 10^5 * 10^9 = 10^14, past int range: accumulate in an int64.
func minimumLevel(root *TreeNode) int {
	bestLevel := 1
	var bestSum int64 = -1
	level := 1
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		var total int64
		next := []*TreeNode{}
		for _, node := range pending {
			total += int64(node.Val)
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		if bestSum < 0 || total < bestSum {
			bestSum = total
			bestLevel = level
		}
		pending = next
		level++
	}
	return bestLevel
}
