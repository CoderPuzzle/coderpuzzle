func minimumOperations(nums []int) int {
	// Greedy two pointers on block sums: the front block (nums[0..i]) must
	// end up equal to the back block. While they differ, the smaller side
	// absorbs its next adjacent element — one merge, and merging can never
	// help the larger side catch up. Equal blocks retire together and
	// scanning continues inside. Block sums reach 10^5 * 10^6 = 10^11, so
	// they ride in int64.
	i, j := 0, len(nums)-1
	var left, right int64
	ops := 0
	for i < j {
		if left == 0 {
			left = int64(nums[i])
		}
		if right == 0 {
			right = int64(nums[j])
		}
		if left == right {
			i++
			j--
			left, right = 0, 0
		} else if left < right {
			i++
			left += int64(nums[i])
			ops++
		} else {
			j--
			right += int64(nums[j])
			ops++
		}
	}
	return ops
}
