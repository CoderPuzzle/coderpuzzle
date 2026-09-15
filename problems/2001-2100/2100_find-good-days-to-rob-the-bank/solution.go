func goodDaysToRobBank(security []int, time int) []int {
	n := len(security)
	before := make([]int, n)
	after := make([]int, n)
	for day := 1; day < n; day++ {
		if security[day-1] >= security[day] {
			before[day] = before[day-1] + 1
		}
	}
	for day := n - 2; day >= 0; day-- {
		if security[day] <= security[day+1] {
			after[day] = after[day+1] + 1
		}
	}
	answer := make([]int, 0)
	for day := 0; day < n; day++ {
		if before[day] >= time && after[day] >= time {
			answer = append(answer, day)
		}
	}
	return answer
}
