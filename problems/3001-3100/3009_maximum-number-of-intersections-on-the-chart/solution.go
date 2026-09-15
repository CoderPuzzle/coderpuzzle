import "sort"

func maxIntersectionCount(y []int) int {
	// The count only changes when the line passes a vertex height, so
	// testing each compressed height v just above (v + 0.5) and exactly
	// at v suffices. Every segment stamps its half-level range
	// [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
	// difference arrays; a prefix pass then reads both counts per
	// height, the at-level one plus a point for each vertex on the line.
	heights := append([]int(nil), y...)
	sort.Ints(heights)
	uniq := heights[:0]
	for _, h := range heights {
		if len(uniq) == 0 || uniq[len(uniq)-1] != h {
			uniq = append(uniq, h)
		}
	}
	m := len(uniq)
	rank := make(map[int]int, m)
	for i, h := range uniq {
		rank[h] = i
	}
	above := make([]int, m)
	at := make([]int, m)
	for i := 0; i+1 < len(y); i++ {
		lo, hi := y[i], y[i+1]
		if lo > hi {
			lo, hi = hi, lo
		}
		above[rank[lo]]++
		above[rank[hi]]--
		if hi-lo > 1 {
			at[rank[lo]+1]++
			at[rank[hi]]--
		}
	}
	seen := make(map[int]int, m)
	for _, v := range y {
		seen[v]++
	}
	best := 0
	spansAbove, spansAt := 0, 0
	for i, h := range uniq {
		spansAbove += above[i]
		spansAt += at[i]
		candidate := spansAbove
		if withVertices := spansAt + seen[h]; withVertices > candidate {
			candidate = withVertices
		}
		if candidate > best {
			best = candidate
		}
	}
	return best
}
