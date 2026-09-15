import "sort"

func minDistance(houses []int, k int) int {
	sort.Ints(houses)
	n := len(houses)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, k+1)
		for b := range memo[i] {
			memo[i][b] = -1
		}
	}
	runCost := func(i, j int) int {
		total := 0
		for lo, hi := i, j; lo < hi; lo, hi = lo+1, hi-1 {
			total += houses[hi] - houses[lo]
		}
		return total
	}
	var dp func(i, boxes int) int
	dp = func(i, boxes int) int {
		if boxes >= n-i {
			return 0
		}
		if memo[i][boxes] != -1 {
			return memo[i][boxes]
		}
		if boxes == 1 {
			memo[i][boxes] = runCost(i, n-1)
			return memo[i][boxes]
		}
		best := int(^uint(0) >> 1)
		for j := i; j <= n-boxes; j++ {
			if c := runCost(i, j) + dp(j+1, boxes-1); c < best {
				best = c
			}
		}
		memo[i][boxes] = best
		return best
	}
	return dp(0, k)
}
