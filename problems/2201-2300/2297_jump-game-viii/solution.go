func minCost(nums []int, costs []int) int64 {
	n := len(nums)
	// from any i, jump to the first later j with nums[j] >= nums[i],
	// or the first later j with nums[j] < nums[i]; nothing farther is reachable
	nextGe := make([]int, n)
	nextSm := make([]int, n)
	for i := range nextGe {
		nextGe[i] = -1
		nextSm[i] = -1
	}
	stack := make([]int, 0, n)
	for i := 0; i < n; i++ {
		for len(stack) > 0 && nums[i] >= nums[stack[len(stack)-1]] {
			// i is exactly the popped index's first >= successor
			nextGe[stack[len(stack)-1]] = i
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, i)
	}
	stack = stack[:0]
	for i := 0; i < n; i++ {
		for len(stack) > 0 && nums[i] < nums[stack[len(stack)-1]] {
			// strict < here: plateaus (==) were resolved by the >= stack
			nextSm[stack[len(stack)-1]] = i
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, i)
	}
	const inf = int64(1) << 60
	// dp[i] = min cost to land on i; jumps only go forward, so the graph is a DAG
	dp := make([]int64, n)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	// every edge points to a strictly larger index, so one forward sweep
	// visits each node after all of its predecessors
	for i := 0; i+1 < n; i++ {
		for _, j := range []int{nextGe[i], nextSm[i]} {
			if j != -1 && dp[i]+int64(costs[j]) < dp[j] {
				dp[j] = dp[i] + int64(costs[j])
			}
		}
	}
	return dp[n-1]
}
