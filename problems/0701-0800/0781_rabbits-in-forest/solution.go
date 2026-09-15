// A rabbit answering k fixes its whole color group at k+1 rabbits, and
// rabbits with different answers can never share one, so every answer
// value is an independent subproblem. When k is reported c times, those
// rabbits fill ceil(c / (k+1)) groups - the most one group can hold -
// and each group counts in full, whether or not all of its rabbits
// answered.
func numRabbits(answers []int) int {
	count := map[int]int{}
	for _, answer := range answers {
		count[answer]++
	}
	total := 0
	for answer, freq := range count {
		group := answer + 1
		total += (freq + group - 1) / group * group
	}
	return total
}
