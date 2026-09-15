func minChanges(nums []int, k int) int {
	// Every symmetric pair (nums[i], nums[n-1-i]) must end up exactly d
	// apart for one shared difference d, so the answer is the cheapest
	// per-pair total over all k + 1 candidates. Sorted as lo <= hi, a
	// pair whose difference already equals d costs 0; otherwise one
	// replacement fixes it exactly when the moved value stays inside
	// [0, k], which is equivalent to d <= hi or d <= k - lo; failing
	// that, the pair costs 2. Bucket exact matches and add a +1 range
	// mark for each one-change reach, then sweep d once: cost(d) =
	// n - reachable(d) - exact(d). Totals stay below n, so int suffices.
	half := len(nums) / 2
	exact := make([]int, k+1)
	delta := make([]int, k+2)
	for i := 0; i < half; i++ {
		a, b := nums[i], nums[len(nums)-1-i]
		if a > b {
			a, b = b, a
		}
		exact[b-a]++
		reach := b
		if k-a > reach {
			reach = k - a
		}
		delta[0]++
		delta[reach+1]--
	}
	best := 2 * half
	reachable := 0
	for d := 0; d <= k; d++ {
		reachable += delta[d]
		if c := 2*half - reachable - exact[d]; c < best {
			best = c
		}
	}
	return best
}
