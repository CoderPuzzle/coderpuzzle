import "strings"

// Every string except the breakpoint carrier stands at max(s, s reversed) -
// fixed slot lengths make per-string maxima optimal. The breakpoint string
// itself is tried in BOTH orientations at every cut, its suffix leading the
// regular string and its prefix closing it, wrapped around the others'
// standing forms in loop order.
func splitLoopedString(strs []string) string {
	n := len(strs)
	best := make([]string, n)
	for i, s := range strs {
		r := reversed(s)
		if s >= r {
			best[i] = s
		} else {
			best[i] = r
		}
	}
	ans := ""
	for i, s := range strs {
		var rest strings.Builder
		for j := 1; j < n; j++ {
			rest.WriteString(best[(i+j)%n])
		}
		others := rest.String()
		for _, t := range []string{s, reversed(s)} {
			for k := 0; k < len(t); k++ {
				cand := t[k:] + others + t[:k]
				if cand > ans {
					ans = cand
				}
			}
		}
	}
	return ans
}

func reversed(s string) string {
	bytes := []byte(s)
	for i, j := 0, len(bytes)-1; i < j; i, j = i+1, j-1 {
		bytes[i], bytes[j] = bytes[j], bytes[i]
	}
	return string(bytes)
}
