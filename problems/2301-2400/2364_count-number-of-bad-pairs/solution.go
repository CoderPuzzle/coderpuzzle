func countBadPairs(nums []int) int64 {
	// j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
	// nums[i] - i: a pair is good exactly when the shifted values match.
	// Count good pairs per shifted value, subtract from all pairs; pair
	// counts reach ~5e9, so run the arithmetic in 64 bits.
	counts := make(map[int]int64)
	var good int64
	for i, value := range nums {
		shifted := value - i
		good += counts[shifted]
		counts[shifted]++
	}
	n := int64(len(nums))
	return n*(n-1)/2 - good
}
