import "sort"

func maxFrequencyScore(nums []int, k int64) int {
	// After sorting, the elements worth converting to one value form a
	// contiguous window: the move cost of a set is minimized at its
	// median, and swapping any non-window member for a skipped
	// in-between element never costs more. Sliding a window [l, r]
	// rightward, the cheapest way to flatten it is to raise everything
	// to the median nums[(l+r)/2], costing (median * left_count -
	// left_sum) + (right_sum - median * right_count) via prefix sums.
	// The cost only shrinks when the window shrinks, so l never moves
	// backwards. Costs reach n * span / 2 ~ 5 * 10^13 and k reaches
	// 10^14, so every product here is computed in 64-bit.
	sort.Ints(nums)
	n := len(nums)
	pre := make([]int64, n+1)
	for i, v := range nums {
		pre[i+1] = pre[i] + int64(v)
	}
	best := 0
	l := 0
	for r := 0; r < n; r++ {
		for {
			mid := (l + r) / 2
			median := int64(nums[mid])
			cost := median*int64(mid-l) - (pre[mid] - pre[l]) +
				(pre[r+1] - pre[mid]) - median*int64(r+1-mid)
			if cost <= k {
				break
			}
			l++
		}
		if r-l+1 > best {
			best = r - l + 1
		}
	}
	return best
}
