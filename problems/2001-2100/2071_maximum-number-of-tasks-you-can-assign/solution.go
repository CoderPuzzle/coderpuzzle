import "sort"

func maxTaskAssign(tasks []int, workers []int, pills int, strength int) int {
	sort.Ints(tasks)
	sort.Ints(workers)
	feasible := func(count int) bool {
		available := make([]int, 0, count)
		front := 0
		taskIndex := 0
		pillsLeft := pills
		for workerIndex := len(workers) - count; workerIndex < len(workers); workerIndex++ {
			worker := workers[workerIndex]
			for taskIndex < count && int64(tasks[taskIndex]) <= int64(worker)+int64(strength) {
				available = append(available, tasks[taskIndex])
				taskIndex++
			}
			if front >= len(available) {
				return false
			}
			if available[front] <= worker {
				front++
			} else {
				if pillsLeft == 0 {
					return false
				}
				pillsLeft--
				available = available[:len(available)-1]
			}
		}
		return true
	}

	low, high := 0, min(len(tasks), len(workers))+1
	for low+1 < high {
		middle := low + (high-low)/2
		if feasible(middle) {
			low = middle
		} else {
			high = middle
		}
	}
	return low
}
