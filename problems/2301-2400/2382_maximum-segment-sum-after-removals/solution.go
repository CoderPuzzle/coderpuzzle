func maximumSegmentSum(nums []int, removeQueries []int) []int64 {
	n := len(nums)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	ssum := make([]int64, n)
	active := make([]bool, n)

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}

	// Reverse time: removals become activations, so the process only
	// ever merges segments. The leading 0 is the answer after the last
	// removal, where nothing remains; skip removeQueries[0] (all other
	// positions are still active at that point).
	answer := make([]int64, 0, n)
	answer = append(answer, 0)
	best := int64(0)
	for qi := len(removeQueries) - 1; qi >= 1; qi-- {
		i := removeQueries[qi]
		active[i] = true
		ssum[i] = int64(nums[i])
		// Merge with any active neighbor; the component total stays at
		// the new root, so ssum[find(i)] is the whole merged block.
		for _, j := range [2]int{i - 1, i + 1} {
			if j >= 0 && j < n && active[j] {
				a, b := find(i), find(j)
				if a != b {
					parent[a] = b
					ssum[b] += ssum[a]
				}
			}
		}
		// Segments only grow along the reversed timeline, so the running
		// max is monotone — one max per step, nothing to evict.
		if s := ssum[find(i)]; s > best {
			best = s
		}
		answer = append(answer, best)
	}
	for l, r := 0, len(answer)-1; l < r; l, r = l+1, r-1 {
		answer[l], answer[r] = answer[r], answer[l]
	}
	return answer
}
