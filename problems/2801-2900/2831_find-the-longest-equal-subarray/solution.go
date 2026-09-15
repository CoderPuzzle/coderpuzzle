func longestEqualSubarray(nums []int, k int) int {
	positionsByValue := map[int][]int{}
	for i, value := range nums {
		positionsByValue[value] = append(positionsByValue[value], i)
	}
	answer := 0
	for _, positions := range positionsByValue {
		left := 0
		for right := 0; right < len(positions); right++ {
			// Span length minus kept copies is the deletion cost.
			for (positions[right]-positions[left])-(right-left) > k {
				left++
			}
			if right-left+1 > answer {
				answer = right - left + 1
			}
		}
	}
	return answer
}
