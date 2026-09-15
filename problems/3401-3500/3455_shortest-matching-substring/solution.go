import (
	"sort"
	"strings"
)

func shortestMatchingSubstring(s string, p string) int {
	parts := strings.SplitN(p, "*", 3)
	a, b, c := parts[0], parts[1], parts[2]
	var occA, occB, occC []int
	if a != "" {
		occA = findAll(s, a)
	}
	if b != "" {
		occB = findAll(s, b)
	}
	if c != "" {
		occC = findAll(s, c)
	}

	type seg struct {
		length int
		occ    []int
	}
	var segs []seg
	if a != "" {
		segs = append(segs, seg{len(a), occA})
	}
	if b != "" {
		segs = append(segs, seg{len(b), occB})
	}
	if c != "" {
		segs = append(segs, seg{len(c), occC})
	}

	if len(segs) == 0 {
		return 0
	}
	if len(segs) == 1 {
		if len(segs[0].occ) == 0 {
			return -1
		}
		return segs[0].length
	}
	if len(segs) == 2 {
		l1, occ1 := segs[0].length, segs[0].occ
		l2, occ2 := segs[1].length, segs[1].occ
		best := -1
		for _, j := range occ2 {
			idx := sort.SearchInts(occ1, j-l1+1) - 1 // bisect_right - 1
			if idx >= 0 {
				cand := j + l2 - occ1[idx]
				if best == -1 || cand < best {
					best = cand
				}
			}
		}
		return best
	}
	// three non-empty segments
	l1, occ1 := segs[0].length, segs[0].occ
	l2, occ2 := segs[1].length, segs[1].occ
	l3, occ3 := segs[2].length, segs[2].occ
	bestIForJ := make([]int, len(occ2))
	for t, j := range occ2 {
		idx := sort.SearchInts(occ1, j-l1+1) - 1
		if idx >= 0 {
			bestIForJ[t] = occ1[idx]
		} else {
			bestIForJ[t] = -1
		}
	}
	best := -1
	for _, k := range occ3 {
		jIdx := sort.SearchInts(occ2, k-l2+1) - 1
		if jIdx >= 0 && bestIForJ[jIdx] != -1 {
			cand := k + l3 - bestIForJ[jIdx]
			if best == -1 || cand < best {
				best = cand
			}
		}
	}
	return best
}

func findAll(s, pat string) []int {
	result := []int{}
	start := 0
	for {
		idx := strings.Index(s[start:], pat)
		if idx == -1 {
			break
		}
		result = append(result, start+idx)
		start = start + idx + 1
	}
	return result
}
