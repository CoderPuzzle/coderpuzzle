import "sort"

func successfulPairs(spells []int, potions []int, success int64) []int {
	// a pair works iff spell * potion >= success, i.e. potion >= need;
	// successful potions are exactly the strongest suffix of the sorted slice
	sort.Ints(potions)
	m := len(potions)
	res := make([]int, len(spells))
	for i, sp := range spells {
		// ceil(success / sp) in integer arithmetic: exact even at 1e10
		need := (success + int64(sp) - 1) / int64(sp)
		// first index with potions[idx] >= need
		idx := sort.Search(m, func(j int) bool { return int64(potions[j]) >= need })
		// every potion from idx on is >= need: that suffix all succeeds
		res[i] = m - idx
	}
	return res
}
