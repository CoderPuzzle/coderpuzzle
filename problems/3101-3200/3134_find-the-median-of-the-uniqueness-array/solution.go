func medianOfUniquenessArray(nums []int) int {
	n := len(nums)
	length := int64(n) * int64(n+1) / 2
	// Lower median of the virtual uniqueness array = rank (length + 1) / 2.
	targetRank := (length + 1) / 2
	// Count subarrays with at most x distinct values via a sliding window.
	countAtMost := func(x int) int64 {
		freq := make(map[int]int)
		left := 0
		result := int64(0)
		for right := 0; right < n; right++ {
			freq[nums[right]]++
			for len(freq) > x {
				out := nums[left]
				freq[out]--
				if freq[out] == 0 {
					delete(freq, out)
				}
				left++
			}
			// Every start inside the now-valid window yields a qualifying subarray.
			result += int64(right - left + 1)
		}
		return result
	}
	// countAtMost is monotone in x, so the least x reaching the rank is the median.
	lo, hi := 1, n
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countAtMost(mid) >= targetRank {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
