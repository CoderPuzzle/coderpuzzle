import "sort"

func maxSelectedElements(nums []int) int {
	sort.Ints(nums)
	dp := map[int]int{}
	best := 0
	for _, a := range nums {
		up := max(dp[a+1], dp[a]+1)
		stay := max(dp[a], dp[a-1]+1)
		dp[a+1] = up
		dp[a] = stay
		best = max(best, max(up, stay))
	}
	return best
}
