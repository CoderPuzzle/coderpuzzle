func splitArraySameAverage(nums []int) bool {
	n := len(nums)
	total := 0
	for _, v := range nums {
		total += v
	}

	// Enumerate one half (at most 2^(n/2) subsets), grouping
	// achievable sums by subset size.
	// Map from subset size -> set of achievable sums with that size.
	subsetSums := func(arr []int) map[int]map[int]bool {
		d := make(map[int]map[int]bool)
		m := len(arr)
		for mask := 0; mask < (1 << m); mask++ {
			s := 0
			sz := 0
			for i := 0; i < m; i++ {
				if mask>>i&1 == 1 {
					s += arr[i]
					sz++
				}
			}
			if d[sz] == nil {
				d[sz] = make(map[int]bool)
			}
			d[sz][s] = true
		}
		return d
	}

	mid := n / 2
	left := subsetSums(nums[:mid])
	right := subsetSums(nums[mid:])
	nr := n - mid

	// Equal averages force both parts to the whole-array average
	// total/n, so seek a proper subset of size s summing to
	// total*s/n; only sizes with an integer target can work, and
	// s in 1..n-1 keeps both parts non-empty.
	for s := 1; s < n; s++ {
		if (total*s)%n != 0 {
			continue
		}
		target := total * s / n
		// Clamp s1 so both pieces actually fit in their halves.
		lo := s - nr
		if lo < 0 {
			lo = 0
		}
		hi := mid
		if s < hi {
			hi = s
		}
		for s1 := lo; s1 <= hi; s1++ {
			s2 := s - s1
			if _, ok := left[s1]; !ok {
				continue
			}
			if _, ok := right[s2]; !ok {
				continue
			}
			// Assemble: a left sum v plus a right sum target - v
			// builds a valid subset (only sums, not identities).
			for v := range left[s1] {
				if right[s2][target-v] {
					return true
				}
			}
		}
	}
	return false
}
