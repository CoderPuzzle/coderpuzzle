// Greedy digit selection backed by a Fenwick tree: for each output
// position, try digits 0..9 and take the first whose cheapest remaining
// occurrence fits the swap budget, then retire that position.
func minInteger(num string, k int) string {
	n := len(num)
	// Fenwick tree over 1..n; tree[p] = 1 means the digit originally at
	// position p is still unplaced. Prefix sums answer "how many unplaced
	// digits sit before position p" in O(log n).
	tree := make([]int, n+1)
	update := func(i, delta int) {
		for ; i <= n; i += i & (-i) {
			tree[i] += delta
		}
	}
	query := func(i int) int {
		total := 0
		for ; i > 0; i -= i & (-i) {
			total += tree[i]
		}
		return total
	}
	for i := 1; i <= n; i++ {
		update(i, 1)
	}

	// Per-digit queues of remaining original (1-indexed) positions, in
	// increasing order, so the front is always the cheapest to reach.
	positions := make([][]int, 10)
	for i := 0; i < n; i++ {
		d := int(num[i] - '0')
		positions[d] = append(positions[d], i+1)
	}
	heads := make([]int, 10) // index of the current front of each queue

	result := make([]byte, 0, n)
	for step := 0; step < n; step++ {
		for d := 0; d < 10; d++ {
			if heads[d] >= len(positions[d]) {
				continue
			}
			p := positions[d][heads[d]]
			// Cost to bring this digit to the front of the unplaced
			// suffix: one swap per still-active digit before it.
			cost := query(p - 1)
			if cost <= k {
				heads[d]++
				update(p, -1)
				k -= cost
				result = append(result, byte('0'+d))
				break
			}
		}
	}
	return string(result)
}
