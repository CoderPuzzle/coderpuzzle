import "sort"

func reconstructQueue(people [][]int) [][]int {
	ordered := make([][]int, len(people))
	copy(ordered, people)
	sort.Slice(ordered, func(a, b int) bool {
		if ordered[a][0] != ordered[b][0] {
			return ordered[a][0] > ordered[b][0] // taller first
		}
		return ordered[a][1] < ordered[b][1] // fewer people in front first
	})
	// With everyone already placed taller-or-equal, inserting at index k
	// puts exactly k such people in front; shorter people inserted later
	// are invisible to taller people's counts.
	queue := [][]int{}
	for _, person := range ordered {
		pos := person[1]
		queue = append(queue, nil)
		copy(queue[pos+1:], queue[pos:])
		queue[pos] = person
	}
	return queue
}
