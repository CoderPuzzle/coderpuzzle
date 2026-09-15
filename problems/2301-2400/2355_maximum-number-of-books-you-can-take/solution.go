func maximumBooks(books []int) int64 {
	n := len(books)
	// dp[i] = best total of a strictly increasing chain ending at i;
	// the rightmost shelf gives everything, so each take is books[i]-(i-x).
	dp := make([]int64, n)
	// Monotonic stack of barrier candidates (nearest j where the chain dies).
	stack := make([]int, 0, n)
	var best int64
	for i := 0; i < n; i++ {
		bi := int64(books[i])
		// Pop shelves x that still fit the demand books[i] - (i - x):
		// any future chain stopping past them stops at or before i.
		for len(stack) > 0 && int64(books[stack[len(stack)-1]]) >= bi-int64(i-stack[len(stack)-1]) {
			stack = stack[:len(stack)-1]
		}
		// Remaining top is the nearest barrier j; the chain covers j+1..i.
		j := -1
		if len(stack) > 0 {
			j = stack[len(stack)-1]
		}
		var length int64
		if j >= 0 {
			length = int64(i - j)
		} else {
			// No barrier: the chain runs to shelf 0, but a shelf cannot
			// demand fewer than one book, so it caps at min(i, books[i])+1.
			length = min(int64(i), bi) + 1 // stop where the sequence would go negative
		}
		// Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
		// strictly below the demanded value, so the two chains join validly.
		s := length*bi - length*(length-1)/2
		if j >= 0 {
			dp[i] = s + dp[j]
		} else {
			dp[i] = s
		}
		if dp[i] > best {
			best = dp[i]
		}
		stack = append(stack, i)
	}
	return best
}
