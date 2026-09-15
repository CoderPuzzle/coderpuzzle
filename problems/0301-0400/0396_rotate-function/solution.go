// F(0) weights each element by its index; every later rotation follows from
// the recurrence, so only the running value is kept.
func maxRotateFunction(nums []int) int {
	n := len(nums)
	total := 0
	current := 0
	for i, value := range nums {
		total += value
		current += i * value
	}
	best := current
	for k := 1; k < n; k++ {
		// One more rotation promotes every element's weight by 1 and
		// demotes nums[n-k] from weight n-1 to weight 0.
		current += total - n*nums[n-k]
		best = max(best, current)
	}
	return best
}
