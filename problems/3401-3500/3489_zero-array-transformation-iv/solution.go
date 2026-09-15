func minZeroArray(nums []int, queries [][]int) int {
	// Stream queries once; per index keep subset-sum reachability of
	// the vals seen so far (0/1 knapsack, one item per query) as a
	// boolean table, and stop updating an index once its target is
	// reachable.
	n := len(nums)
	reach := make([][]bool, n)
	done := make([]bool, n)
	remaining := 0
	for i, t := range nums {
		if t == 0 {
			done[i] = true
		} else {
			reach[i] = make([]bool, t+1)
			reach[i][0] = true
			remaining++
		}
	}
	if remaining == 0 {
		return 0
	}
	for k, q := range queries {
		l, r, val := q[0], q[1], q[2]
		for i := l; i <= r; i++ {
			if done[i] || val > nums[i] {
				continue
			}
			row := reach[i]
			for s := nums[i] - val; s >= 0; s-- {
				if row[s] {
					row[s+val] = true
				}
			}
			if row[nums[i]] {
				done[i] = true
				remaining--
			}
		}
		if remaining == 0 {
			return k + 1
		}
	}
	return -1
}
