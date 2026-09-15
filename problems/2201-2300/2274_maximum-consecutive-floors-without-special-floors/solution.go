import "sort"

func maxConsecutive(bottom int, top int, special []int) int {
	sort.Ints(special)
	best := special[0] - bottom
	if gap := top - special[len(special)-1]; gap > best {
		best = gap
	}
	for i := 1; i < len(special); i++ {
		if gap := special[i] - special[i-1] - 1; gap > best {
			best = gap
		}
	}
	return best
}
