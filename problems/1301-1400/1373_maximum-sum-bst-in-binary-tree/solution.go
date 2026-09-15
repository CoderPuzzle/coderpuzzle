import "math"

func maxSumBST(root *TreeNode) int64 {
	best := int64(0)
	// returns ok, lo, hi, sum; an empty subtree yields
	// (true, MaxInt64, MinInt64, 0).
	var dfs func(node *TreeNode) (bool, int64, int64, int64)
	dfs = func(node *TreeNode) (bool, int64, int64, int64) {
		if node == nil {
			return true, math.MaxInt64, math.MinInt64, 0
		}
		lok, llo, lhi, lsum := dfs(node.Left)
		rok, rlo, rhi, rsum := dfs(node.Right)
		if !lok || !rok {
			return false, 0, 0, 0
		}
		v := int64(node.Val)
		if lhi >= v || rlo <= v {
			return false, 0, 0, 0
		}
		sum := lsum + rsum + v
		if sum > best {
			best = sum
		}
		lo := v
		if llo < v {
			lo = llo
		}
		hi := v
		if rhi > v {
			hi = rhi
		}
		return true, lo, hi, sum
	}
	dfs(root)
	return best
}
