func findGCD(nums []int) int {
	mn := nums[0]
	mx := nums[0]
	for _, value := range nums {
		if value < mn {
			mn = value
		}
		if value > mx {
			mx = value
		}
	}
	for mx != 0 {
		mn, mx = mx, mn%mx
	}
	return mn
}
