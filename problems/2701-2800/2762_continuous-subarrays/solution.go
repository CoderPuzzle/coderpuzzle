func continuousSubarrays(nums []int) int64 {
	minDq := make([]int, 0, len(nums)) // indices, values increasing (front = min)
	maxDq := make([]int, 0, len(nums)) // indices, values decreasing (front = max)
	minHead, maxHead := 0, 0
	count := int64(0)
	left := 0
	for right, value := range nums {
		for len(minDq) > minHead && nums[minDq[len(minDq)-1]] >= value {
			minDq = minDq[:len(minDq)-1]
		}
		minDq = append(minDq, right)
		for len(maxDq) > maxHead && nums[maxDq[len(maxDq)-1]] <= value {
			maxDq = maxDq[:len(maxDq)-1]
		}
		maxDq = append(maxDq, right)
		// equality is allowed, so only a spread above 2 forces the shrink
		for nums[maxDq[maxHead]]-nums[minDq[minHead]] > 2 {
			if maxDq[maxHead] == left {
				maxHead++
			}
			if minDq[minHead] == left {
				minHead++
			}
			left++
		}
		// every start in [left, right] keeps the spread within the band
		count += int64(right - left + 1)
	}
	return count
}
