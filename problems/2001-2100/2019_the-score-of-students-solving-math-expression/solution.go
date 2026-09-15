func scoreOfStudents(s string, answers []int) int {
	correct := correctValue(s)
	size := (len(s) + 1) / 2
	numbers := make([]int, size)
	operators := make([]byte, size-1)
	for index := 0; index < size; index++ {
		numbers[index] = int(s[index*2] - '0')
		if index+1 < size {
			operators[index] = s[index*2+1]
		}
	}

	dp := make([][]map[int]bool, size)
	for left := range dp {
		dp[left] = make([]map[int]bool, size)
		dp[left][left] = map[int]bool{numbers[left]: true}
	}
	for length := 2; length <= size; length++ {
		for left := 0; left+length <= size; left++ {
			right := left + length - 1
			dp[left][right] = make(map[int]bool)
			for split := left; split < right; split++ {
				for first := range dp[left][split] {
					for second := range dp[split+1][right] {
						var value int64
						if operators[split] == '+' {
							value = int64(first) + int64(second)
						} else {
							value = int64(first) * int64(second)
						}
						if value <= 1000 {
							dp[left][right][int(value)] = true
						}
					}
				}
			}
		}
	}

	score := 0
	for _, answer := range answers {
		if int64(answer) == correct {
			score += 5
		} else if dp[0][size-1][answer] {
			score += 2
		}
	}
	return score
}

func correctValue(expression string) int64 {
	var total int64
	product := int64(expression[0] - '0')
	for index := 1; index < len(expression); index += 2 {
		value := int64(expression[index+1] - '0')
		if expression[index] == '*' {
			product *= value
		} else {
			total += product
			product = value
		}
	}
	return total + product
}
