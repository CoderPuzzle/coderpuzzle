func divisibleTripletCount(nums []int, d int) int {
	// A triplet sum is divisible by d exactly when a middle element's
	// remainder completes the outer two: fix the left index L, sweep R
	// forward keeping remainder counts of the elements strictly between
	// them, and each lookup of the needed remainder counts every such
	// middle at once.
	count := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		between := make(map[int]int)
		for j := i + 1; j < n; j++ {
			need := (d - (nums[i]+nums[j])%d) % d
			count += between[need]
			between[nums[j]%d]++
		}
	}
	return count
}
