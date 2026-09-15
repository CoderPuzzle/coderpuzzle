func countMajoritySubarrays(nums []int, target int) int64 {
	total := int64(0)
	// Fix the left endpoint and grow the window one element at a time;
	// each step updates the running count of target in constant time.
	for start := 0; start < len(nums); start++ {
		count := 0
		for end := start; end < len(nums); end++ {
			if nums[end] == target {
				count++
			}
			// target is the majority exactly when it holds strictly
			// more than half of the window: twice its count beats
			// the length.
			if 2*count > end-start+1 {
				total++
			}
		}
	}
	return total
}
