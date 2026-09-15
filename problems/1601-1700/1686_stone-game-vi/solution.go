import "sort"

func stoneGameVI(aliceValues []int, bobValues []int) int {
	n := len(aliceValues)
	// Taking a stone gains your value AND denies the opponent theirs, so
	// both players effectively compete for aliceValues[i] + bobValues[i].
	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		i, j := order[a], order[b]
		return aliceValues[i]+bobValues[i] > aliceValues[j]+bobValues[j]
	})
	diff := 0
	for rank, i := range order {
		if rank%2 == 0 {
			diff += aliceValues[i] // Alice picks ranks 0, 2, 4, ...
		} else {
			diff -= bobValues[i] // Bob picks ranks 1, 3, 5, ...
		}
	}
	if diff > 0 {
		return 1
	}
	if diff < 0 {
		return -1
	}
	return 0
}
