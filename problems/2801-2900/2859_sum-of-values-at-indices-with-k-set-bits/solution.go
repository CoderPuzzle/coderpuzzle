func sumIndicesWithKSetBits(nums []int, k int) int {
	answer := 0
	for index, value := range nums {
		setBits := 0
		for rest := index; rest > 0; rest &= rest - 1 {
			setBits++
		}
		if setBits == k {
			answer += value
		}
	}
	return answer
}
