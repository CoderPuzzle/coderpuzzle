import "sort"

// A limit-L element can only be taken while fewer than L elements are
// active, and the moment the count reaches L the rest of its group locks
// out forever — so each group contributes at most its min(L, m) largest
// values. Sorting by value descending and capping each group at L picks
// collects exactly those.
func maxTotal(value []int, limit []int) int64 {
	type pair struct {
		v int
		l int
	}
	items := make([]pair, len(value))
	for i, v := range value {
		items[i] = pair{v, limit[i]}
	}
	sort.Slice(items, func(i, j int) bool {
		if items[i].v != items[j].v {
			return items[i].v > items[j].v
		}
		return items[i].l > items[j].l
	})
	taken := make([]int64, len(value)+1)
	var total int64
	for _, p := range items {
		if taken[p.l] < int64(p.l) {
			taken[p.l]++
			total += int64(p.v)
		}
	}
	return total
}
