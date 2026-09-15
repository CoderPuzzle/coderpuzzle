// A subarray's sum is the difference of two prefix sums, and that
// difference is divisible by k exactly when both prefixes leave the same
// remainder. An array counting each normalized remainder seen so far,
// seeded with the empty prefix's 0, answers the lookup in O(1) per step.
func subarraysDivByK(nums []int, k int) int {
	count := 0
	prefix := 0
	remainders := make([]int, k)
	remainders[0] = 1
	for _, value := range nums {
		prefix += value
		r := ((prefix % k) + k) % k
		count += remainders[r]
		remainders[r]++
	}
	return count
}
