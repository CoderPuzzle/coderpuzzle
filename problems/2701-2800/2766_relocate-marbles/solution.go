import "sort"

func relocateMarbles(nums []int, moveFrom []int, moveTo []int) []int {
	// Only occupancy matters: a move relocates every marble sitting on a
	// position at once, so one set of occupied positions tracks the state.
	occupied := make(map[int]bool, len(nums))
	for _, position := range nums {
		occupied[position] = true
	}
	// In order: vacate the source, occupy the target. A self-move deletes and
	// re-adds the same position; merging into an occupied target is just a
	// map write.
	for step := range moveFrom {
		delete(occupied, moveFrom[step])
		occupied[moveTo[step]] = true
	}
	answer := make([]int, 0, len(occupied))
	for position := range occupied {
		answer = append(answer, position)
	}
	sort.Ints(answer)
	return answer
}
