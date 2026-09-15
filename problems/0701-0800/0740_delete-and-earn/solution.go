import "sort"

func deleteAndEarn(nums []int) int {
	// Deleting one copy of v removes its neighbors for free, so a strategy
	// just picks distinct values, earning v*count[v] each — house-robber over
	// the sorted distinct values.
	count := map[int]int{}
	for _, v := range nums {
		count[v]++
	}
	values := make([]int, 0, len(count))
	for k := range count {
		values = append(values, k)
	}
	sort.Ints(values)

	take, skip := 0, 0
	hasPrev := false
	prev := 0
	for _, value := range values {
		base := take
		if skip > take {
			base = skip
		}
		// Adjacent predecessor conflicts with its take; a gap (missing v-1)
		// makes taking v conflict with nothing, so both states carry in.
		if hasPrev && prev == value-1 {
			base = skip
		}
		newTake := base + value*count[value]
		newSkip := take
		if skip > take {
			newSkip = skip
		}
		take, skip = newTake, newSkip
		prev, hasPrev = value, true
	}
	if skip > take {
		return skip
	}
	return take
}
