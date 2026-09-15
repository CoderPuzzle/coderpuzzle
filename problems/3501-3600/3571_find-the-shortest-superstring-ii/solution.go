import "strings"

// Containment first: the shorter answer is then always a merge that overlaps
// a suffix of one string with a prefix of the other, so the scan takes the
// largest such overlap in either direction and lets the first direction win
// ties.
func shortestSuperstring(s1 string, s2 string) string {
	maxOverlap := func(a, b string) int {
		top := len(a)
		if len(b) < top {
			top = len(b)
		}
		for k := top; k > 0; k-- {
			if a[len(a)-k:] == b[:k] {
				return k
			}
		}
		return 0
	}
	if strings.Contains(s1, s2) {
		return s1
	}
	if strings.Contains(s2, s1) {
		return s2
	}
	ov1 := maxOverlap(s1, s2) // suffix of s1 == prefix of s2
	ov2 := maxOverlap(s2, s1)
	if ov1 >= ov2 {
		return s1 + s2[ov1:]
	}
	return s2 + s1[ov2:]
}
