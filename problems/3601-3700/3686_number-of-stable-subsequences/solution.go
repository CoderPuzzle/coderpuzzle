func countStableSubsequences(nums []int) int {
	const mod = 1_000_000_007
	// Three same-parity elements in a row are the only way a subsequence
	// breaks, so four counters describe every stable subsequence seen so far:
	// trailing even run of length 1 or 2, trailing odd run of 1 or 2. Each
	// update sums at most four residues, so int64 never overflows.
	var e1, e2, o1, o2 int64
	for _, x := range nums {
		if x%2 == 0 {
			// Fresh subsequence, odd-ending extensions (the even run restarts
			// at 1), or an even run of 1 promoted to 2; Go's multi-assignment
			// evaluates the right-hand side before either update lands.
			e1, e2 = (e1+o1+o2+1)%mod, (e2+e1)%mod
		} else {
			// Mirror image with odd and even swapped.
			o1, o2 = (o1+e1+e2+1)%mod, (o2+o1)%mod
		}
	}
	return int((e1 + e2 + o1 + o2) % mod)
}
