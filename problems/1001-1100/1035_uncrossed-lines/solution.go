func maxUncrossedLines(nums1 []int, nums2 []int) int {
	n := len(nums2)
	prev := make([]int, n+1)
	for _, a := range nums1 {
		cur := make([]int, n+1)
		for j := 1; j <= n; j++ {
			if a == nums2[j-1] {
				cur[j] = prev[j-1] + 1
			} else {
				if cur[j-1] > prev[j] {
					cur[j] = cur[j-1]
				} else {
					cur[j] = prev[j]
				}
			}
		}
		prev = cur
	}
	return prev[n]
}
