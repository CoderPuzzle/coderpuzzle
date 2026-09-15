func countRangeSum(nums []int, lower int, upper int) int {
	n := len(nums)
	// Range sums become pairs: count i < j with
	// prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
	prefix := make([]int64, n+1)
	for i, v := range nums {
		prefix[i+1] = prefix[i] + int64(v)
	}

	var mergeCount func(lo, hi int) int64
	mergeCount = func(lo, hi int) int64 {
		if lo >= hi {
			return 0
		}
		mid := lo + (hi-lo)/2
		// Pairs inside each half first; cross pairs next.
		count := mergeCount(lo, mid) + mergeCount(mid+1, hi)

		// Left half is sorted, so for each left prefix the valid right
		// entries form the window [l, r): l skips below-lower, r passes
		// at-most-upper; both pointers only ever move forward.
		l, r := mid+1, mid+1
		for i := lo; i <= mid; i++ {
			for l <= hi && prefix[l]-prefix[i] < int64(lower) {
				l++
			}
			for r <= hi && prefix[r]-prefix[i] <= int64(upper) {
				r++
			}
			count += int64(r - l)
		}

		// Standard merge re-sorts the range, restoring the invariant
		// the parent level relies on.
		merged := make([]int64, 0, hi-lo+1)
		i, j := lo, mid+1
		for i <= mid && j <= hi {
			if prefix[i] <= prefix[j] {
				merged = append(merged, prefix[i])
				i++
			} else {
				merged = append(merged, prefix[j])
				j++
			}
		}
		for i <= mid {
			merged = append(merged, prefix[i])
			i++
		}
		for j <= hi {
			merged = append(merged, prefix[j])
			j++
		}
		copy(prefix[lo:hi+1], merged)
		return count
	}

	return int(mergeCount(0, n))
}
