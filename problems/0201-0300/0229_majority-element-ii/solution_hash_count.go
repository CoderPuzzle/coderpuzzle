import "sort"

// A hash map counts every occurrence directly: one sweep tallies each value
// into a table keyed by the value itself, and the map ends up holding each
// distinct value's exact frequency.
func majorityElement(nums []int) []int {
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	// At most two values can clear the n/3 bar, so one selection pass over
	// the entries finds the only two tallies that can matter: a strictly
	// greater tally takes the top slot, demoting the leader, and ties keep
	// the earlier entry — harmless, since equal tallies qualify or fail
	// together.
	threshold := len(nums) / 3
	bestValue, bestCount := 0, 0
	secondValue, secondCount := 0, 0
	for value, count := range counts {
		switch {
		case count > bestCount:
			secondValue, secondCount = bestValue, bestCount
			bestValue, bestCount = value, count
		case count > secondCount:
			secondValue, secondCount = value, count
		}
	}
	// Selection only nominates; the threshold check is where an exactly-n/3
	// value is excluded and an unfilled slot — a tally of zero — fails. Map
	// keys are distinct, so the slots cannot collide.
	// Start at an empty, non-nil slice so an empty answer encodes as [].
	result := []int{}
	if bestCount > threshold {
		result = append(result, bestValue)
	}
	if secondCount > threshold {
		result = append(result, secondValue)
	}
	// At most two answers survive; sorting pins the ascending order the
	// examples show.
	sort.Ints(result)
	return result
}
