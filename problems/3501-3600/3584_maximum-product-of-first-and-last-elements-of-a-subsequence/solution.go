// A size-m subsequence with first index i and last index j exists iff
// j >= i + m - 1. For m == 1 first and last are the same element, so
// the answer is the best square. Otherwise sweep i downward: the
// eligible window nums[i+m-1:] grows by one entry per step, so its max
// and min update in O(1), and one of those two extremes is always the
// best partner for nums[i]. Products reach 1e5 * 1e5, so int64 math.
func maximumProduct(nums []int, m int) int64 {
	n := len(nums)
	if m == 1 {
		best := int64(-1 << 62)
		for _, v := range nums {
			p := int64(v) * int64(v)
			if p > best {
				best = p
			}
		}
		return best
	}
	smax, smin := int64(nums[n-1]), int64(nums[n-1])
	best := int64(nums[n-m]) * int64(nums[n-1])
	for i := n - m - 1; i >= 0; i-- {
		v := int64(nums[i+m-1])
		if v > smax {
			smax = v
		} else if v < smin {
			smin = v
		}
		if p := int64(nums[i]) * smax; p > best {
			best = p
		}
		if p := int64(nums[i]) * smin; p > best {
			best = p
		}
	}
	return best
}
