func beautifulSplits(nums []int) int {
	n := len(nums)
	if n < 3 {
		return 0
	}
	w := n + 1
	// lcp[i][j] = longest common prefix of nums[i:] and nums[j:]
	lcp := make([]uint16, w*w)
	for i := n - 1; i >= 0; i-- {
		row := i * w
		nextRow := (i + 1) * w
		ni := nums[i]
		for j := n - 1; j > i; j-- {
			if ni == nums[j] {
				lcp[row+j] = lcp[nextRow+j+1] + 1
			}
		}
	}

	count := 0
	for i := 1; i < n-1; i++ { // i = end of nums1, start of nums2
		jEnd := n
		// Case A: nums1 is a prefix of nums2 => j >= 2*i and nums[0:i] == nums[i:2i]
		if int(lcp[i]) >= i && 2*i <= n-1 {
			count += n - 2*i
			jEnd = 2 * i
		}
		// Case B: nums2 is a prefix of nums3, counting only j not already covered by A
		row := i * w
		for j := i + 1; j < jEnd; j++ {
			L := j - i
			if int(lcp[row+j]) >= L && n-j >= L {
				count++
			}
		}
	}
	return count
}
