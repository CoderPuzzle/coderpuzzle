import "sort"

func maxProfitAssignment(difficulty []int, profit []int, worker []int) int {
	// Workers never compete: jobs are reusable, so each worker simply
	// earns the maximum profit among the jobs whose difficulty is at
	// most their ability. Sort the jobs by difficulty, carry the running
	// profit maximum, and read every worker's earning off a binary
	// search into the sorted difficulties.
	jobs := make([][2]int, len(difficulty))
	for i := range difficulty {
		jobs[i] = [2]int{difficulty[i], profit[i]}
	}
	sort.Slice(jobs, func(a, b int) bool {
		return jobs[a][0] < jobs[b][0]
	})
	hardest := make([]int, len(jobs))
	best := make([]int, len(jobs))
	top := 0
	for i, job := range jobs {
		if job[1] > top {
			top = job[1]
		}
		hardest[i] = job[0]
		best[i] = top
	}
	total := 0
	for _, ability := range worker {
		index := sort.Search(len(hardest), func(i int) bool { return hardest[i] > ability }) - 1
		if index >= 0 {
			total += best[index]
		}
	}
	return total
}
