// Stones joined by shared rows and columns split the plane into connected
// components. Inside a component of k stones any k - 1 can go: peel the
// component down to one survivor, every removal still sharing a row or
// column with a stone that remains. Stones of different components never
// share a line, so the answer is n minus the number of components —
// union-find merges each stone with the first stone registered in its row
// and in its column, and the roots count the components.
func removeStones(stones [][]int) int {
	n := len(stones)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}

	firstInRow := make(map[int]int)
	firstInCol := make(map[int]int)
	for i, stone := range stones {
		x, y := stone[0], stone[1]
		if j, ok := firstInRow[x]; ok {
			union(i, j)
		} else {
			firstInRow[x] = i
		}
		if j, ok := firstInCol[y]; ok {
			union(i, j)
		} else {
			firstInCol[y] = i
		}
	}

	components := 0
	for i := range parent {
		if find(i) == i {
			components++
		}
	}
	return n - components
}
