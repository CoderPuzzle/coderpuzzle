func minMirrorPairDistance(nums []int) int {
	best := -1
	// Most recent index for each reversed value (-1 marks "not seen yet");
	// a nearer supplier beats a farther one for every future match, so
	// older entries never matter again.
	latest := map[int]int{}
	for index, num := range nums {
		// Look up before recording: an index cannot pair with itself, so
		// palindromic values wait here for a genuine second occurrence.
		if mirror, ok := latest[num]; ok && (best == -1 || index-mirror < best) {
			best = index - mirror
		}
		// Reversal peels last digits off until none remain; trailing zeros
		// drop out on their own (120 -> 21, 100 -> 1).
		reversedValue := 0
		for value := num; value > 0; value /= 10 {
			reversedValue = reversedValue*10 + value%10
		}
		latest[reversedValue] = index
	}
	return best
}
