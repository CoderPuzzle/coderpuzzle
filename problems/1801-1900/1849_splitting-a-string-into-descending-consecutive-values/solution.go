import "strconv"

// Fixing the first piece forces everything after it: each next piece must
// read as exactly prev-1. Leading zeros let several lengths share one
// value, so backtrack over each matching length. A first piece of 11+
// digits cannot work: its successor alone needs 10+ of the at most 9
// leftover characters.
func splitString(s string) bool {
	n := len(s)
	for firstEnd := 1; firstEnd < min(n, 11); firstEnd++ {
		first, _ := strconv.ParseInt(s[:firstEnd], 10, 64)
		if extend(s, firstEnd, first) {
			return true
		}
	}
	return false
}

func extend(s string, pos int, prev int64) bool {
	want := prev - 1
	if pos == len(s) {
		return true
	}
	if want < 0 {
		return false
	}
	var v int64
	for end := pos + 1; end <= len(s); end++ {
		v = v*10 + int64(s[end-1]-'0')
		if v == want && extend(s, end, want) {
			return true
		}
		if v > want {
			break
		}
	}
	return false
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
