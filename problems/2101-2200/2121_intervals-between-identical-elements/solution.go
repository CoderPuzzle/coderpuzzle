func getDistances(arr []int) []int64 {
	answer := make([]int64, len(arr))
	counts := make(map[int]int64)
	sums := make(map[int]int64)
	for index, value := range arr {
		answer[index] += int64(index)*counts[value] - sums[value]
		counts[value]++
		sums[value] += int64(index)
	}
	counts = make(map[int]int64)
	sums = make(map[int]int64)
	for index := len(arr) - 1; index >= 0; index-- {
		value := arr[index]
		answer[index] += sums[value] - int64(index)*counts[value]
		counts[value]++
		sums[value] += int64(index)
	}
	return answer
}
