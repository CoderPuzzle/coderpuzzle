// The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
// Sweep c left to right, and for each d > c count how many earlier
// pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
// pair sums is extended by one entry per c step. Every valid
// quadruplet is counted exactly once at its c, d pair. The maximum
// answer is C(50, 4) = 230300, well inside int.
func countQuadruplets(nums []int) int {
	n := len(nums)
	ans := 0
	twoSum := make(map[int]int)
	for c := 0; c < n; c++ {
		for a := 0; a < c-1; a++ {
			s := nums[a] + nums[c-1]
			twoSum[s]++
		}
		for d := c + 1; d < n; d++ {
			ans += twoSum[nums[d]-nums[c]]
		}
	}
	return ans
}
