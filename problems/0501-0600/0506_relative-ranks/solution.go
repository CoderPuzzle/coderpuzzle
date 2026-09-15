import (
	"sort"
	"strconv"
)

// Sorting the athletes, not the array: an index slice ordered by descending
// score carries each athlete's placement back to its original slot, so the
// answer keeps the input's order.
func findRelativeRanks(score []int) []string {
	order := make([]int, len(score))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return score[order[a]] > score[order[b]] })
	medals := []string{"Gold Medal", "Silver Medal", "Bronze Medal"}
	answer := make([]string, len(score))
	for place, i := range order {
		if place < 3 {
			answer[i] = medals[place]
		} else {
			answer[i] = strconv.Itoa(place + 1)
		}
	}
	return answer
}
