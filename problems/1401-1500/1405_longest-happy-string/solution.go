import "sort"

func longestDiverseString(a int, b int, c int) string {
	counts := []int{a, b, c}
	letters := []byte{'a', 'b', 'c'}
	var result []byte
	// most plentiful letter first: burning rare letters while a common
	// one dominates would strand it in a forced aaa/bbb/ccc run
	for {
		idx := []int{0, 1, 2}
		sort.Slice(idx, func(x, y int) bool {
			if counts[idx[x]] != counts[idx[y]] {
				return counts[idx[x]] > counts[idx[y]]
			}
			return letters[idx[x]] < letters[idx[y]]
		})
		pick := idx[0]
		if counts[pick] == 0 {
			break
		}
		n := len(result)
		if n >= 2 && result[n-1] == letters[pick] && result[n-2] == letters[pick] {
			// head letter just placed twice -> switch to the runner-up; if
			// the runner-up is out of budget, only one letter remains and it
			// is already doubled — cap here rather than emit a triple
			pick = idx[1]
			if counts[pick] == 0 {
				break
			}
		}
		result = append(result, letters[pick])
		counts[pick]--
	}
	return string(result)
}
