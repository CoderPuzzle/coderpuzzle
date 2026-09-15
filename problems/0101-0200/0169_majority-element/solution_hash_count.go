func majorityElement(nums []int) int {
	// The premise taken literally: the answer turns up more than n / 2
	// times, so tally every value and stop at the first tally that crosses
	// half the array.
	counts := make(map[int]int)
	half := len(nums) / 2
	for _, num := range nums {
		counts[num]++
		// No value can be overtaken once a tally passes half: two values
		// cannot both hold more than half the positions.
		if counts[num] > half {
			return num
		}
	}
	// A majority is promised, so the sweep always returns mid-loop.
	panic("unreachable: a majority is promised")
}
