import "sort"

func largestValsFromLabels(values []int, labels []int, numWanted int, useLimit int) int {
	// Greedy: sort items by value descending and take each one while both
	// the per-label cap and the total count allow it.
	type item struct {
		value int
		label int
	}
	items := make([]item, len(values))
	for i := range values {
		items[i] = item{values[i], labels[i]}
	}
	sort.Slice(items, func(a, b int) bool { return items[a].value > items[b].value })
	used := map[int]int{}
	total := 0
	taken := 0
	for _, it := range items {
		if taken == numWanted {
			break
		}
		if used[it.label] == useLimit {
			continue
		}
		used[it.label]++
		total += it.value
		taken++
	}
	return total
}
