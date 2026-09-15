func minimumOperations(nums []int) int {
	// Removing the minimum number of elements is keeping the maximum
	// non-decreasing subsequence, and with values confined to {1, 2, 3}
	// such a subsequence is a run of 1s, then 2s, then 3s. One pass
	// keeps three running best lengths ending in each value: appending
	// x may extend any subsequence ending in a value <= x, so each
	// update is one plus the largest eligible counter. n <= 100 keeps
	// every count far inside int range.
	keep1, keep2, keep3 := 0, 0, 0
	for _, x := range nums {
		if x == 1 {
			keep1++
		} else if x == 2 {
			if keep1 > keep2 {
				keep2 = keep1
			}
			keep2++
		} else {
			best := keep3
			if keep1 > best {
				best = keep1
			}
			if keep2 > best {
				best = keep2
			}
			keep3 = best + 1
		}
	}
	best := keep3
	if keep1 > best {
		best = keep1
	}
	if keep2 > best {
		best = keep2
	}
	return len(nums) - best
}
