// A subarray's sum is the difference of two prefix sums, so the windows
// ending at each position with sum goal pair exactly with the earlier
// prefixes worth prefix - goal. A map counting each prefix sum seen so
// far answers that lookup in O(1) per position, one pass in all.
func numSubarraysWithSum(nums []int, goal int) int {
	count := 0
	prefix := 0
	seen := map[int]int{0: 1}
	for _, value := range nums {
		prefix += value
		count += seen[prefix-goal]
		seen[prefix]++
	}
	return count
}
