import "sort"

func minimumDifference(nums []int, k int) int {
	abs := func(v int) int {
		if v < 0 {
			return -v
		}
		return v
	}
	// Seed from the first element so single-element subarrays are covered.
	best := abs(nums[0] - k)
	// Empty-subarray seed: 0 | v = v lets the first build produce {v}.
	current := []int{0}
	// OR never clears bits, so the nested frontier holds at most ~31 values.
	for _, value := range nums {
		// New frontier: {value} plus every previous OR extended by value.
		nxt := []int{value}
		for _, prev := range current {
			nxt = append(nxt, prev|value)
		}
		sort.Ints(nxt)
		uniq := nxt[:0]
		for i, x := range nxt {
			if i == 0 || nxt[i-1] != x {
				uniq = append(uniq, x)
			}
		}
		current = uniq
		for _, x := range current {
			if diff := abs(x - k); diff < best {
				best = diff
			}
		}
	}
	return best
}
