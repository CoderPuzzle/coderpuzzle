// Memoized interval DP. dfs(l, r, k) is the best score from boxes[l..r]
// when k boxes of boxes[l]'s color, already removed from outside the
// interval, sit glued to its left and will join its group.
func removeBoxes(boxes []int) int {
	n := len(boxes)
	memo := make([][][]int, n)
	for l := range memo {
		memo[l] = make([][]int, n)
		for r := range memo[l] {
			memo[l][r] = make([]int, n+1)
			for k := range memo[l][r] {
				memo[l][r][k] = -1
			}
		}
	}

	var dfs func(l, r, k int) int
	dfs = func(l, r, k int) int {
		if l > r {
			return 0
		}
		// Adjacent same-colored boxes never need separate treatment:
		// holding boxes[l] until its identical neighbor leaves only grows
		// the eventual group, so the run joins the carry.
		for l < r && boxes[l+1] == boxes[l] {
			l++
			k++
		}
		if memo[l][r][k] != -1 {
			return memo[l][r][k]
		}
		// Either take boxes[l] and its carry now, scoring (k+1)^2...
		best := (k+1)*(k+1) + dfs(l+1, r, 0)
		// ...or hold it: clear boxes[l+1..m-1] first, so boxes[l] meets
		// the next same-colored box one richer in the carry.
		for m := l + 1; m <= r; m++ {
			if boxes[m] == boxes[l] {
				best = max(best, dfs(l+1, m-1, 0)+dfs(m, r, k+1))
			}
		}
		memo[l][r][k] = best
		return best
	}

	return dfs(0, n-1, 0)
}
