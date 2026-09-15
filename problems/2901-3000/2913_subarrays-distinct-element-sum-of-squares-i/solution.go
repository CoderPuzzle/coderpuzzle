func sumCounts(nums []int) int {
	n := len(nums)
	var ans int64
	// For each left end, grow the right end one element at a time; the
	// running distinct count only ever grows, so it is the distinct
	// count of every prefix subarray nums[i..j].
	for i := 0; i < n; i++ {
		var seen [101]bool
		distinct := 0
		for j := i; j < n; j++ {
			if !seen[nums[j]] {
				seen[nums[j]] = true
				distinct++
			}
			ans += int64(distinct) * int64(distinct)
		}
	}
	return int(ans)
}
