import "sort"

func intersectionSizeTwo(intervals [][]int) int {
	ivs := make([][2]int, len(intervals))
	for i, iv := range intervals {
		ivs[i] = [2]int{iv[0], iv[1]}
	}
	sort.Slice(ivs, func(a, b int) bool {
		if ivs[a][1] != ivs[b][1] {
			return ivs[a][1] < ivs[b][1]
		}
		return ivs[a][0] > ivs[b][0]
	})
	// Chosen points stay non-decreasing; points inside [s, e] are the
	// trailing run, so checking the last two suffices.
	chosen := make([]int, 0, 2*len(intervals))
	for _, iv := range ivs {
		s, e := iv[0], iv[1]
		m := len(chosen)
		if m >= 2 && chosen[m-2] >= s {
			continue
		}
		if m >= 1 && chosen[m-1] >= s {
			chosen = append(chosen, e)
		} else {
			chosen = append(chosen, e-1, e)
		}
	}
	return len(chosen)
}
