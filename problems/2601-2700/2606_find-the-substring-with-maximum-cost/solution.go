// Resolve each letter's value once (defaults from the alphabet, overrides
// from chars), then run Kadane's algorithm: snapping the running sum back to
// 0 whenever it dips negative keeps the empty substring's cost of 0 as the
// floor for the answer. Costs stay under 1e5 * 1000 = 1e8, so int suffices.
func maximumCostSubstring(s string, chars string, vals []int) int {
	value := make([]int, 26)
	for i := range value {
		value[i] = i + 1
	}
	for i := 0; i < len(chars); i++ {
		value[chars[i]-'a'] = vals[i]
	}
	best := 0
	run := 0
	for i := 0; i < len(s); i++ {
		next := run + value[s[i]-'a']
		if next < 0 {
			next = 0
		}
		run = next
		if run > best {
			best = run
		}
	}
	return best
}
