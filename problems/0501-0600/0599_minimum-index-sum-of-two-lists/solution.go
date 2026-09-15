// The strings of each list are unique, so one map from a string to its index
// in list1 settles every "where does it count from" query. A strictly smaller
// index sum restarts the winners at the new minimum; an equal one extends the
// tie, so the winners come out in the order they appear in list2.
func findRestaurant(list1 []string, list2 []string) []string {
	indexOf := make(map[string]int, len(list1))
	for i, s := range list1 {
		indexOf[s] = i
	}
	best := 0
	result := make([]string, 0, len(list2))
	for j, s := range list2 {
		i, ok := indexOf[s]
		if !ok {
			continue
		}
		if len(result) == 0 || i+j < best {
			best = i + j
			result = append(result[:0], s)
		} else if i+j == best {
			result = append(result, s)
		}
	}
	return result
}
