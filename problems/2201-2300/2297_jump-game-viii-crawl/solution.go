func minCost(nums []int, costs []int) int64 {
	n := len(nums)
	nextGe := make([]int, n)
	nextLt := make([]int, n)
	for i := range nextGe {
		nextGe[i] = -1
		nextLt[i] = -1
	}
	greaterStack := []int{}
	lowerStack := []int{}
	for index := n - 1; index >= 0; index-- {
		for len(greaterStack) > 0 && nums[greaterStack[len(greaterStack)-1]] < nums[index] {
			greaterStack = greaterStack[:len(greaterStack)-1]
		}
		if len(greaterStack) > 0 {
			nextGe[index] = greaterStack[len(greaterStack)-1]
		}
		greaterStack = append(greaterStack, index)
		for len(lowerStack) > 0 && nums[lowerStack[len(lowerStack)-1]] >= nums[index] {
			lowerStack = lowerStack[:len(lowerStack)-1]
		}
		if len(lowerStack) > 0 {
			nextLt[index] = lowerStack[len(lowerStack)-1]
		}
		lowerStack = append(lowerStack, index)
	}
	const inf int64 = 1 << 62
	best := make([]int64, n)
	for i := range best {
		best[i] = inf
	}
	best[0] = 0
	for index := 0; index < n; index++ {
		for _, target := range []int{nextGe[index], nextLt[index]} {
			if target != -1 && best[index]+int64(costs[target]) < best[target] {
				best[target] = best[index] + int64(costs[target])
			}
		}
	}
	return best[n-1]
}
