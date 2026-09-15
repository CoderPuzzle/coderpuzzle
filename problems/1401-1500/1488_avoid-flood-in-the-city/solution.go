import "sort"

func avoidFlood(rains []int64) []int64 {
	n := len(rains)
	zeros := make([]int, 0)
	last := make(map[int64]int)
	ans := make([]int64, n)
	for i := range ans {
		ans[i] = -1
	}
	for i := 0; i < n; i++ {
		r := rains[i]
		if r == 0 {
			ans[i] = 1
			pos := sort.SearchInts(zeros, i+1)
			zeros = append(zeros, 0)
			copy(zeros[pos+1:], zeros[pos:])
			zeros[pos] = i
			continue
		}
		if prev, seen := last[r]; seen {
			pos := sort.SearchInts(zeros, prev+1)
			if pos == len(zeros) || zeros[pos] >= i {
				return []int64{}
			}
			ans[zeros[pos]] = r
			zeros = append(zeros[:pos], zeros[pos+1:]...)
		}
		last[r] = i
	}
	return ans
}
