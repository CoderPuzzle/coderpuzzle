func maxValidPairSum(nums []int, k int) int64 {
	bestLeft := int64(nums[0])
	answer := int64(-1 << 60)
	for j := k; j < len(nums); j++ {
		if int64(nums[j-k]) > bestLeft {
			bestLeft = int64(nums[j-k])
		}
		if bestLeft+int64(nums[j]) > answer {
			answer = bestLeft + int64(nums[j])
		}
	}
	return answer
}
