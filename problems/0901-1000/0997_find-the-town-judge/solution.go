func findJudge(n int, trust [][]int) int {
	score := make([]int, n+1)
	for _, pair := range trust {
		a, b := pair[0], pair[1]
		score[a]--
		score[b]++
	}

	for person := 1; person <= n; person++ {
		if score[person] == n-1 {
			return person
		}
	}
	return -1
}
