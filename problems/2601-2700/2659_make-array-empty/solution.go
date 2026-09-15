import "sort"

func countOperationsToEmptyArray(nums []int) int64 {
	n := len(nums)
	if n == 0 {
		return 0
	}

	tree := make([]int64, n+1)

	add := func(i int, delta int64) {
		for ; i <= n; i += i & (-i) {
			tree[i] += delta
		}
	}

	prefix := func(i int) int64 {
		var s int64
		for ; i > 0; i -= i & (-i) {
			s += tree[i]
		}
		return s
	}

	topBit := 1
	for topBit*2 <= n {
		topBit *= 2
	}

	kth := func(k int64) int {
		idx := 0
		for bit := topBit; bit > 0; bit >>= 1 {
			nxt := idx + bit
			if nxt <= n && tree[nxt] < k {
				idx = nxt
				k -= tree[nxt]
			}
		}
		return idx + 1
	}

	for i := 1; i <= n; i++ {
		add(i, 1)
	}

	order := make([]int, n)
	for i := range order {
		order[i] = i
	}
	sort.SliceStable(order, func(a, b int) bool {
		return nums[order[a]] < nums[order[b]]
	})

	var ops int64
	cur := 1
	removed := 0
	for _, idx := range order {
		pos := idx + 1
		if pos >= cur {
			ops += prefix(pos) - prefix(cur-1)
		} else {
			ops += prefix(n) - prefix(cur-1) + prefix(pos)
		}
		add(pos, -1)
		removed++
		remaining := n - removed
		if remaining > 0 {
			rankAfter := prefix(pos)
			nextRank := (rankAfter % int64(remaining)) + 1
			cur = kth(nextRank)
		}
	}
	return ops
}
