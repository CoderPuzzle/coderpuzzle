func findSubarrays(nums []int) bool {
	// Sweep the n-1 length-2 window sums into a set; the first repeat
	// answers true.
	seen := map[int]bool{}
	for i := 0; i+1 < len(nums); i++ {
		sum := nums[i] + nums[i+1]
		if seen[sum] {
			return true
		}
		seen[sum] = true
	}
	return false
}
