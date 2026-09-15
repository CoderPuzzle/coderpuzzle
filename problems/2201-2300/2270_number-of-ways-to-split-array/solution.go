// A rolling prefix sum plus the precomputed total decides each split in O(1);
// the right half is simply total - prefix. Prefix sums reach +/-1e10 here, so
// they stay int64.
func waysToSplitArray(nums []int) int {
	total := int64(0)
	for _, x := range nums {
		total += int64(x)
	}
	prefix := int64(0)
	count := 0
	for i := 0; i+1 < len(nums); i++ {
		prefix += int64(nums[i])
		if prefix >= total-prefix {
			count++
		}
	}
	return count
}
