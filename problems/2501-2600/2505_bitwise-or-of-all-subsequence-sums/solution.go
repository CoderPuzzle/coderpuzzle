func subsequenceSumOr(nums []int) int64 {
	// Each element and each running prefix is itself a subsequence sum, and
	// together they carry every bit the full OR can raise, so one pass folds
	// both into the answer. Prefixes reach 10^14, so everything widens to
	// int64 before accumulating.
	var ans int64
	var pre int64
	for _, x := range nums {
		pre += int64(x)
		ans |= int64(x) | pre
	}
	return ans
}
