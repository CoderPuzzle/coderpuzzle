import "sort"

func maximumSumQueries(nums1 []int, nums2 []int, queries [][]int) []int64 {
	n := len(nums1)
	type point struct{ x, y int }
	points := make([]point, n)
	for j := 0; j < n; j++ {
		points[j] = point{nums1[j], nums2[j]}
	}
	sort.Slice(points, func(a, b int) bool { return points[a].x > points[b].x })
	order := make([]int, len(queries))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return queries[order[a]][0] > queries[order[b]][0] })

	keys := make([]int64, 0, n)
	bests := make([]int64, 0, n)

	insert := func(y int64, total int64) {
		pos := sort.Search(len(keys), func(i int) bool { return keys[i] >= y })
		if pos < len(keys) && keys[pos] == y {
			if bests[pos] >= total {
				return
			}
			keys = append(keys[:pos], keys[pos+1:]...)
			bests = append(bests[:pos], bests[pos+1:]...)
		}
		if pos < len(keys) && bests[pos] >= total {
			return
		}
		for pos > 0 && bests[pos-1] <= total {
			keys = append(keys[:pos-1], keys[pos:]...)
			bests = append(bests[:pos-1], bests[pos:]...)
			pos--
		}
		keys = append(keys, 0)
		copy(keys[pos+1:], keys[pos:])
		keys[pos] = y
		bests = append(bests, 0)
		copy(bests[pos+1:], bests[pos:])
		bests[pos] = total
	}

	answer := make([]int64, len(queries))
	for i := range answer {
		answer[i] = -1
	}
	pointIndex := 0
	for _, qi := range order {
		boundX := queries[qi][0]
		boundY := queries[qi][1]
		for pointIndex < n && int64(points[pointIndex].x) >= int64(boundX) {
			p := points[pointIndex]
			insert(int64(p.y), int64(p.x)+int64(p.y))
			pointIndex++
		}
		pos := sort.Search(len(keys), func(i int) bool { return keys[i] >= int64(boundY) })
		if pos < len(keys) {
			answer[qi] = bests[pos]
		}
	}
	return answer
}
