func minimumSplits(nums []int) int {
	// A block's gcd only ever shrinks as it absorbs elements, so the
	// greedy is forced: keep extending the open block while its running
	// gcd stays above 1, and cut exactly when the next element would drop
	// it to 1. Cutting earlier can never help — any split of a still-good
	// prefix leaves the right part no better off.
	parts := 1
	run := nums[0]
	for _, v := range nums[1:] {
		run = gcd(run, v)
		if run == 1 {
			parts++
			run = v
		}
	}
	return parts
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
