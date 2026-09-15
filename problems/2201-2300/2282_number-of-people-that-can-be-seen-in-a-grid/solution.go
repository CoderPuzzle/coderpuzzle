func seePeople(heights [][]int) [][]int {
	m := len(heights)
	n := len(heights[0])
	res := make([][]int, m)
	for i := range res {
		res[i] = make([]int, n)
	}

	// Count people visible to the right in each row.
	for i := 0; i < m; i++ {
		st := make([]int, 0, n)
		for j := n - 1; j >= 0; j-- {
			x := heights[i][j]
			cnt := 0
			for len(st) > 0 && st[len(st)-1] < x {
				st = st[:len(st)-1]
				cnt++
			}
			if len(st) > 0 {
				cnt++
			}
			res[i][j] += cnt
			for len(st) > 0 && st[len(st)-1] <= x {
				st = st[:len(st)-1]
			}
			st = append(st, x)
		}
	}

	// Count people visible below in each column.
	for j := 0; j < n; j++ {
		st := make([]int, 0, m)
		for i := m - 1; i >= 0; i-- {
			x := heights[i][j]
			cnt := 0
			for len(st) > 0 && st[len(st)-1] < x {
				st = st[:len(st)-1]
				cnt++
			}
			if len(st) > 0 {
				cnt++
			}
			res[i][j] += cnt
			for len(st) > 0 && st[len(st)-1] <= x {
				st = st[:len(st)-1]
			}
			st = append(st, x)
		}
	}

	return res
}
