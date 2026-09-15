func minReverseOperations(n int, p int, banned []int, k int) []int {
	// Alive positions of one parity as jump pointers over slots
	// (position / 2): first returns the smallest alive slot >= pos,
	// removing a slot fuses it into its successor.
	first := func(parent []int, pos int) int {
		for parent[pos] != pos {
			parent[pos] = parent[parent[pos]]
			pos = parent[pos]
		}
		return pos
	}
	answer := make([]int, n)
	for i := range answer {
		answer[i] = -1
	}
	var parent [2][]int
	for parity := 0; parity < 2; parity++ {
		size := (n + 1 - parity) / 2
		nodes := make([]int, size+1)
		for i := range nodes {
			nodes[i] = i
		}
		parent[parity] = nodes
	}
	consume := func(position int) {
		slot := position >> 1
		parent[position&1][slot] = slot + 1
	}
	consume(p)
	for _, b := range banned {
		consume(b)
	}
	queue := make([]int, 0, n)
	queue = append(queue, p)
	answer[p] = 0
	for head := 0; head < len(queue); head++ {
		x := queue[head]
		left := x - k + 1
		if left < 0 {
			left = 0
		}
		right := x
		if n-k < right {
			right = n - k
		}
		if left > right {
			continue
		}
		lo := 2*left + k - 1 - x
		hi := 2*right + k - 1 - x
		parity := lo & 1
		step := lo >> 1
		for slot := first(parent[parity], step); 2*slot+parity <= hi; slot = first(parent[parity], slot+1) {
			y := 2*slot + parity
			answer[y] = answer[x] + 1
			queue = append(queue, y)
			parent[parity][slot] = slot + 1
		}
	}
	return answer
}
