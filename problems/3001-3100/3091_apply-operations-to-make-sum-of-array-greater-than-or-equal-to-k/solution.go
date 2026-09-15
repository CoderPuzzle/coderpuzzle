// All increases come first, all duplicates last: a final array of m equal
// values v costs v-1 increases plus m-1 duplicates and sums to m*v.
// Enumerate the single-element value v and take ceil(k/v)-1 duplicates; the
// best split wins. With k <= 10^5 every sum fits an int comfortably.
func minOperations(k int) int {
	best := k - 1
	for v := 1; v <= k; v++ {
		dup := (k+v-1)/v - 1
		if dup < 0 {
			dup = 0
		}
		if cost := v - 1 + dup; cost < best {
			best = cost
		}
	}
	return best
}
