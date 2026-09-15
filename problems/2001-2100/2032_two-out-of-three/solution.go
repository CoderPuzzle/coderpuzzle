func twoOutOfThree(nums1 []int, nums2 []int, nums3 []int) []int {
	masks := make([]int, 101)
	arrays := [][]int{nums1, nums2, nums3}
	for index, nums := range arrays {
		bit := 1 << index
		for _, value := range nums {
			masks[value] |= bit
		}
	}

	answer := []int{}
	for value := 1; value <= 100; value++ {
		mask := masks[value]
		if mask&(mask-1) != 0 {
			answer = append(answer, value)
		}
	}
	return answer
}
