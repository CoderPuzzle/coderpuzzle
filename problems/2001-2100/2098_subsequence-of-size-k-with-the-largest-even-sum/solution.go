import "sort"

func largestEvenSum(nums []int, k int) int64 {
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))
	var total int64
	smallestSelected := [2]int{-1, -1}
	for _, value := range nums[:k] {
		total += int64(value)
		smallestSelected[value%2] = value
	}
	if total%2 == 0 {
		return total
	}

	largestUnselected := [2]int{-1, -1}
	for _, value := range nums[k:] {
		parity := value % 2
		if largestUnselected[parity] == -1 {
			largestUnselected[parity] = value
		}
	}

	answer := int64(-1)
	for parity := 0; parity < 2; parity++ {
		if smallestSelected[parity] != -1 && largestUnselected[1-parity] != -1 {
			candidate := total - int64(smallestSelected[parity]) + int64(largestUnselected[1-parity])
			if candidate > answer {
				answer = candidate
			}
		}
	}
	return answer
}
