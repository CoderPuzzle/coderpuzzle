import "sort"

func highFive(items [][]int) [][]int {
	// Bucket every score by student, sort each bucket descending, and
	// average the top five with integer division.
	scores := map[int][]int{}
	for _, item := range items {
		scores[item[0]] = append(scores[item[0]], item[1])
	}
	ids := make([]int, 0, len(scores))
	for id := range scores {
		ids = append(ids, id)
	}
	sort.Ints(ids)
	result := make([][]int, 0, len(ids))
	for _, id := range ids {
		list := scores[id]
		sort.Sort(sort.Reverse(sort.IntSlice(list)))
		total := 0
		for i := 0; i < 5; i++ {
			total += list[i]
		}
		result = append(result, []int{id, total / 5})
	}
	return result
}
