func majorityElement(nums []int) int {
	// The guarantee taken at face value: the answer is the one value whose
	// tally passes n / 2, so count occurrences per distinct value and report
	// the first tally to cross that line.
	counts := make(map[int]int)
	half := len(nums) / 2
	for _, value := range nums {
		counts[value]++
		// No rival can catch a tally already past half: two values cannot
		// both own more than half the positions.
		if counts[value] > half {
			return value
		}
	}
	// A majority is promised, so the sweep always returns mid-loop.
	panic("unreachable: a majority is promised")
}
