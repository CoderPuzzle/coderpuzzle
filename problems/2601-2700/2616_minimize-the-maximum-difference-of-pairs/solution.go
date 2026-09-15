import "sort"

func minimizeMax(nums []int, p int) int {
	// An optimal selection can always pair adjacent sorted values, so sort
	// once and ask: does a cap `diff` admit p disjoint pairs? The predicate
	// is monotone in diff — a larger cap only admits more pairs — so binary
	// search the minimum feasible cap over the span. p = 0 succeeds at 0.
	sorted := append([]int(nil), nums...)
	sort.Ints(sorted)
	n := len(sorted)
	can := func(diff int) bool {
		// Greedy scan: take every adjacent pair within diff and skip one
		// element otherwise. Taking each cheap pair is safe (exchange
		// argument), so this counts the maximum pairs under the cap.
		count := 0
		i := 1
		for i < n {
			if sorted[i]-sorted[i-1] <= diff {
				count++
				i += 2
			} else {
				i++
			}
		}
		return count >= p
	}
	lo, hi := 0, sorted[n-1]-sorted[0]
	for lo < hi {
		mid := lo + (hi-lo)/2
		if can(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
