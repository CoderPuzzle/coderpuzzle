import "math"

func closestValue(root *TreeNode, target float64) int {
	// One root-to-leaf descent: the search path for target visits the
	// largest value below it and the smallest above it, so the closest
	// value is decided on the path alone.
	best := 0
	bestDistance := math.Inf(1)
	node := root
	for node != nil {
		distance := math.Abs(float64(node.Val) - target)
		// Strictly closer wins; at exactly equal distance the smaller
		// value wins, which settles ties like target 3.5 over 3 and 4.
		if distance < bestDistance || (distance == bestDistance && node.Val < best) {
			best = node.Val
			bestDistance = distance
		}
		if target < float64(node.Val) {
			node = node.Left
		} else {
			node = node.Right
		}
	}
	return best
}
