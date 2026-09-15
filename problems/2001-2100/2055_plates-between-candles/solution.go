func platesBetweenCandles(s string, queries [][]int) []int {
	length := len(s)
	platePrefix := make([]int, length+1)
	leftNearest := make([]int, length)
	nearest := -1
	for index := 0; index < length; index++ {
		platePrefix[index+1] = platePrefix[index]
		if s[index] == '*' {
			platePrefix[index+1]++
		} else {
			nearest = index
		}
		leftNearest[index] = nearest
	}

	rightNearest := make([]int, length)
	nearest = -1
	for index := length - 1; index >= 0; index-- {
		if s[index] == '|' {
			nearest = index
		}
		rightNearest[index] = nearest
	}

	answer := make([]int, len(queries))
	for index, query := range queries {
		leftCandle := rightNearest[query[0]]
		rightCandle := leftNearest[query[1]]
		if leftCandle != -1 && rightCandle != -1 && leftCandle < rightCandle {
			answer[index] = platePrefix[rightCandle] - platePrefix[leftCandle]
		}
	}
	return answer
}
