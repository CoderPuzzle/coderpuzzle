import "sort"

func matchPlayersAndTrainers(players []int, trainers []int) int {
	sort.Ints(players)
	sort.Ints(trainers)
	// Greedy: pair the weakest unmatched player with the weakest
	// unmatched trainer — optimal by an exchange argument.
	i, j, matches := 0, 0, 0
	for i < len(players) && j < len(trainers) {
		if players[i] <= trainers[j] {
			matches++
			i++
			j++
		} else {
			// Trainer too weak for the weakest remaining player; players
			// only get stronger, so it is useless forever — skip it.
			j++
		}
	}
	return matches
}
