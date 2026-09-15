import "sort"

// Union-Find assigns every station its fixed grid; an offline station stays
// in its grid, so connectivity never changes. Each component's sorted
// member list plus an advancing minimum pointer answers "smallest online"
// in amortized constant time.
func processQueries(c int, connections [][]int, queries [][]int) []int {
	parent := make([]int, c+1)
	size := make([]int, c+1)
	for i := 1; i <= c; i++ {
		parent[i] = i
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
	for _, e := range connections {
		union(e[0], e[1])
	}

	// Group stations by component root, each group sorted ascending.
	groups := map[int][]int{}
	for x := 1; x <= c; x++ {
		r := find(x)
		groups[r] = append(groups[r], x)
	}
	components := [][]int{}
	compOf := make([]int, c+1)
	for _, members := range groups {
		sort.Ints(members)
		ci := len(components)
		for _, m := range members {
			compOf[m] = ci
		}
		components = append(components, members)
	}

	online := make([]bool, c+1)
	for i := 1; i <= c; i++ {
		online[i] = true
	}
	// ptr[i] is the smallest index into components[i] that is still online;
	// stations only go offline, so it moves monotonically forward.
	ptr := make([]int, len(components))

	answer := []int{}
	for _, q := range queries {
		x := q[1]
		if q[0] == 1 {
			if online[x] {
				// An online station resolves the check by itself, even if
				// a smaller station in the same grid is online.
				answer = append(answer, x)
			} else {
				members := components[compOf[x]]
				p := ptr[compOf[x]]
				if p < len(members) {
					answer = append(answer, members[p])
				} else {
					answer = append(answer, -1)
				}
			}
		} else if online[x] {
			online[x] = false
			ci := compOf[x]
			members := components[ci]
			// Only a hit on the current minimum forces the pointer on.
			if members[ptr[ci]] == x {
				p := ptr[ci]
				for p < len(members) && !online[members[p]] {
					p++
				}
				ptr[ci] = p
			}
		}
	}
	return answer
}
