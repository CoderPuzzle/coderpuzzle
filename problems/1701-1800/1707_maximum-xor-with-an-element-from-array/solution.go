import "sort"

func maximizeXor(nums []int, queries [][]int) []int {
	sortedNums := make([]int, len(nums))
	copy(sortedNums, nums)
	sort.Ints(sortedNums)
	nq := len(queries)
	order := make([]int, nq)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool {
		qa, qb := queries[order[a]], queries[order[b]]
		if qa[1] != qb[1] {
			return qa[1] < qb[1]
		}
		if qa[0] != qb[0] {
			return qa[0] < qb[0]
		}
		return order[a] < order[b]
	})
	answers := make([]int, nq)
	child := make([][2]int, 1, len(sortedNums)*31+4)
	child[0] = [2]int{-1, -1}
	ptr := 0
	n := len(sortedNums)
	// Offline: with nums and queries both sorted by threshold, the trie
	// holds exactly the values <= mi when a query runs, so the filter
	// costs nothing at query time.
	for _, idx := range order {
		mi := queries[idx][1]
		xi := queries[idx][0]
		// ptr only moves forward — each number enters the trie once.
		// 30 levels (bit 29 down to 0) cover every value < 2^30.
		for ptr < n && sortedNums[ptr] <= mi {
			node := 0
			v := sortedNums[ptr]
			for bit := 29; bit >= 0; bit-- {
				b := (v >> uint(bit)) & 1
				if child[node][b] == -1 {
					child[node][b] = len(child)
					child = append(child, [2]int{-1, -1})
				}
				node = child[node][b]
			}
			ptr++
		}
		if ptr == 0 {
			// Threshold admits no element yet — no candidate exists.
			answers[idx] = -1
			continue
		}
		node := 0
		best := 0
		// Greedy descent from the MSB: prefer the complement child so this
		// result bit becomes 1; settle for the matching child otherwise.
		for bit := 29; bit >= 0; bit-- {
			xb := (xi >> uint(bit)) & 1
			want := 1 - xb
			if child[node][want] != -1 {
				best |= 1 << uint(bit)
				node = child[node][want]
			} else {
				node = child[node][xb]
			}
		}
		answers[idx] = best
	}
	return answers
}
