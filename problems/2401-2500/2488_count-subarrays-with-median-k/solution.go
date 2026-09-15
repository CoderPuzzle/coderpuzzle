func countSubarrays(nums []int, k int) int64 {
	n := len(nums)
	pos := -1
	for i, v := range nums {
		if v == k {
			pos = i
			break
		}
	}
	// balance ranges over [-n, n]; offset by n.
	balance := make([]int64, 2*n+1)
	balance[n] = 1
	current := 0
	var count int64
	for i, v := range nums {
		if v > k {
			current++
		} else if v < k {
			current--
		}
		if i >= pos {
			count += balance[current+n] + balance[current-1+n]
		} else {
			balance[current+n]++
		}
	}
	return count
}
