func longestRepeating(s string, queryCharacters string, queryIndices []int) []int {
	n := len(s)
	if n == 0 {
		return []int{}
	}

	pref := make([]int, 4*n)
	suf := make([]int, 4*n)
	best := make([]int, 4*n)
	segLen := make([]int, 4*n)
	leftChar := make([]byte, 4*n)
	rightChar := make([]byte, 4*n)
	chars := []byte(s)

	var pull func(node int)
	var build func(node, lo, hi int)
	var update func(node, lo, hi, pos int, ch byte)

	// recompute a parent's summary from its two children alone
	pull = func(node int) {
		l, r := 2*node, 2*node+1
		segLen[node] = segLen[l] + segLen[r]
		leftChar[node] = leftChar[l]
		rightChar[node] = rightChar[r]
		// prefix spans into the right child only if the left child is one
		// whole run and the boundary characters agree
		if pref[l] == segLen[l] && leftChar[l] == leftChar[r] {
			pref[node] = pref[l] + pref[r]
		} else {
			pref[node] = pref[l]
		}
		if suf[r] == segLen[r] && rightChar[r] == rightChar[l] {
			suf[node] = suf[r] + suf[l]
		} else {
			suf[node] = suf[r]
		}
		// a run may straddle the child boundary when the boundary chars agree
		joined := 0
		if rightChar[l] == leftChar[r] {
			joined = suf[l] + pref[r]
		}
		m := best[l]
		if best[r] > m {
			m = best[r]
		}
		if joined > m {
			m = joined
		}
		best[node] = m
	}

	build = func(node, lo, hi int) {
		if lo == hi {
			// a leaf is the trivial summary: a single run of length 1
			pref[node], suf[node], best[node] = 1, 1, 1
			segLen[node] = 1
			leftChar[node] = chars[lo]
			rightChar[node] = chars[lo]
			return
		}
		mid := (lo + hi) / 2
		build(2*node, lo, mid)
		build(2*node+1, mid+1, hi)
		pull(node)
	}

	update = func(node, lo, hi, pos int, ch byte) {
		if lo == hi {
			chars[pos] = ch
			leftChar[node] = ch
			rightChar[node] = ch
			return
		}
		mid := (lo + hi) / 2
		if pos <= mid {
			update(2*node, lo, mid, pos, ch)
		} else {
			update(2*node+1, mid+1, hi, pos, ch)
		}
		// recompute the O(log n) nodes on the path back to the root
		pull(node)
	}

	build(1, 0, n-1)
	result := make([]int, 0, len(queryIndices))
	for i, idx := range queryIndices {
		update(1, 0, n-1, idx, queryCharacters[i])
		// the root's best is the answer after each point update
		result = append(result, best[1])
	}
	return result
}
