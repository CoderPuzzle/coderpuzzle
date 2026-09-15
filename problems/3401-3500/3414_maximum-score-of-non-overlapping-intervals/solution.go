import "sort"

// State carries the best score for a prefix plus the lexicographically
// smallest ascending index tuple achieving it (at most four picks).
type state struct {
	score int64
	slots [4]int32
	len   int
}

func lessTup(a, b state) bool {
	for t := 0; t < 4; t++ {
		va, vb := int32(-1), int32(-1)
		if t < a.len {
			va = a.slots[t]
		}
		if t < b.len {
			vb = b.slots[t]
		}
		if va != vb {
			return va < vb
		}
	}
	return false
}

func maximumWeight(intervals [][]int) []int {
	n := len(intervals)
	// Sort by right endpoint: every pick set is a chain in this order, and
	// sharing any point (even one boundary) means overlapping, so
	// predecessors must end strictly left of the current left end.
	order := make([]int, n)
	for t := range order {
		order[t] = t
	}
	sort.Slice(order, func(a, b int) bool {
		ra, rb := intervals[order[a]][1], intervals[order[b]][1]
		if ra != rb {
			return ra < rb
		}
		return intervals[order[a]][0] < intervals[order[b]][0]
	})
	rights := make([]int, n)
	for t := range order {
		rights[t] = intervals[order[t]][1]
	}

	var neg int64 = -(1 << 62)
	// Layer k: over prefix length i, best score picking exactly k of the
	// first i sorted intervals.
	prev := make([]state, n+1)
	cur := make([]state, n+1)
	var best [5]state
	for k := 1; k <= 4; k++ {
		cur[0] = state{score: neg}
		for i := 1; i <= n; i++ {
			cur[i] = cur[i-1]
			idx := order[i-1]
			left := intervals[idx][0]
			weight := int64(intervals[idx][2])
			// Predecessors end strictly left of `left`.
			j := sort.Search(len(rights), func(p int) bool { return rights[p] >= left })
			if prev[j].score > neg/4 {
				candScore := prev[j].score + weight
				cand := prev[j]
				cand.score = candScore
				idx32 := int32(idx)
				pos := cand.len
				for pos > 0 && cand.slots[pos-1] > idx32 {
					pos--
				}
				for t := cand.len; t > pos; t-- {
					cand.slots[t] = cand.slots[t-1]
				}
				cand.slots[pos] = idx32
				cand.len++
				// Score first; on a tie the smaller index tuple wins.
				if candScore > cur[i].score || (candScore == cur[i].score && lessTup(cand, cur[i])) {
					cur[i] = cand
				}
			}
		}
		best[k] = cur[n]
		prev, cur = cur, prev
	}

	top := neg
	for k := 1; k <= 4; k++ {
		if best[k].score > top {
			top = best[k].score
		}
	}
	winner := -1
	for k := 1; k <= 4; k++ {
		if best[k].score == top && (winner < 0 || lessTup(best[k], best[winner])) {
			winner = k
		}
	}
	out := make([]int, best[winner].len)
	for t := 0; t < best[winner].len; t++ {
		out[t] = int(best[winner].slots[t])
	}
	return out
}
