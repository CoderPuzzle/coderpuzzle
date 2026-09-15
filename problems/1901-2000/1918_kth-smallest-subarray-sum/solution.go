func kthSmallestSubarraySum(nums []int, k int) int {
	// f(x) = number of subarrays with sum <= x. Sliding window: positivity
	// guarantees shrinking monotonically reduces the sum.
	countAtMost := func(limit int64) int64 {
		var total int64
		var windowSum int64
		left := 0
		for right, value := range nums {
			windowSum += int64(value)
			for windowSum > limit {
				windowSum -= int64(nums[left])
				left++
			}
			// Subarrays ending at `right` that fit: exactly the window's length.
			total += int64(right - left + 1)
		}
		return total
	}

	lo := int64(1 << 62)
	hi := int64(0)
	for _, value := range nums {
		v := int64(value)
		if v < lo {
			lo = v
		}
		hi += v
	}
	// lo/hi now bracket the answer over [min element, total sum]: f is
	// non-decreasing and jumps only at real subarray sums, so the smallest x
	// with f(x) >= k IS the k-th smallest sum.
	for lo < hi {
		mid := (lo + hi) / 2
		if countAtMost(mid) >= int64(k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
