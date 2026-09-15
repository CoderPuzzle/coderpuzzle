import "sort"

func minProcessingTime(processorTime []int, tasks []int) int {
	sort.Ints(processorTime)
	tasksDesc := append([]int(nil), tasks...)
	sort.Sort(sort.Reverse(sort.IntSlice(tasksDesc)))
	answer := 0
	for i, task := range tasksDesc {
		if processorTime[i/4]+task > answer {
			answer = processorTime[i/4] + task
		}
	}
	return answer
}
