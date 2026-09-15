import "sort"

func minimumRounds(tasks []int) int {
	sort.Ints(tasks)
	rounds := 0
	for i := 0; i < len(tasks); {
		j := i
		for j < len(tasks) && tasks[j] == tasks[i] {
			j++
		}
		count := j - i
		if count == 1 {
			return -1
		}
		rounds += (count + 2) / 3
		i = j
	}
	return rounds
}
