import "sort"

func findWinners(matches [][]int) [][]int {
	losses := make(map[int]int)
	for _, match := range matches {
		winner, loser := match[0], match[1]
		if _, seen := losses[winner]; !seen {
			losses[winner] = 0
		}
		losses[loser]++
	}
	answer := [][]int{make([]int, 0), make([]int, 0)}
	for player, count := range losses {
		switch count {
		case 0:
			answer[0] = append(answer[0], player)
		case 1:
			answer[1] = append(answer[1], player)
		}
	}
	sort.Ints(answer[0])
	sort.Ints(answer[1])
	return answer
}
