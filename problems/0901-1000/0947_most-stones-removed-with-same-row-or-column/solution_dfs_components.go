// Row-or-column adjacency splits the stones into connected components, and a
// component of k stones gives up k - 1 of them, so the answer is n minus the
// number of components. Rather than encode the merging, walk it: bucket the
// stone indexes by row and by column, then depth-first search from every
// stone not yet reached, expanding through both of its buckets. Each bucket
// is deleted the first time it is expanded, so the whole shared line is
// absorbed at once and no bucket is ever scanned twice.
func removeStones(stones [][]int) int {
	n := len(stones)
	rows := make(map[int][]int)
	cols := make(map[int][]int)
	for i, stone := range stones {
		rows[stone[0]] = append(rows[stone[0]], i)
		cols[stone[1]] = append(cols[stone[1]], i)
	}

	visited := make([]bool, n)
	stack := make([]int, 0, n)
	components := 0
	for start := 0; start < n; start++ {
		if visited[start] {
			continue
		}
		components++
		visited[start] = true
		stack = append(stack, start)
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if group, ok := rows[stones[u][0]]; ok {
				delete(rows, stones[u][0])
				for _, v := range group {
					if !visited[v] {
						visited[v] = true
						stack = append(stack, v)
					}
				}
			}
			if group, ok := cols[stones[u][1]]; ok {
				delete(cols, stones[u][1])
				for _, v := range group {
					if !visited[v] {
						visited[v] = true
						stack = append(stack, v)
					}
				}
			}
		}
	}

	return n - components
}
