func totalSteps(nums []int) int {
	// stack of pairs (value, step)
	stVal := make([]int64, 0, len(nums))
	stStep := make([]int64, 0, len(nums))
	var ans int64
	for _, x := range nums {
		var cur int64
		for len(stVal) > 0 && stVal[len(stVal)-1] <= int64(x) {
			popped := stStep[len(stStep)-1]
			stVal = stVal[:len(stVal)-1]
			stStep = stStep[:len(stStep)-1]
			if popped > cur {
				cur = popped
			}
		}
		if len(stVal) > 0 {
			cur++
		} else {
			cur = 0
		}
		stVal = append(stVal, int64(x))
		stStep = append(stStep, cur)
		if cur > ans {
			ans = cur
		}
	}
	return int(ans)
}
