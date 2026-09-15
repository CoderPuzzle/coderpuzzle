import "strings"

// Every occurrence of every word paints its half-open interval onto a boolean
// mask. Painting overlapping AND adjacent intervals onto one mask merges them
// exactly as the two tag rules demand, so no interval bookkeeping is needed.
// Each word is located by find-restart — search again from one past every hit
// — because a single non-restarting search would consume the overlapping
// occurrences ("aa" inside "aaa" at both 0 and 1).
func addBoldTag(s string, words []string) string {
	n := len(s)
	bold := make([]bool, n)
	for _, word := range words {
		offset := 0
		for {
			rel := strings.Index(s[offset:], word)
			if rel == -1 {
				break
			}
			start := offset + rel
			for j := start; j < start+len(word); j++ {
				bold[j] = true
			}
			offset = start + 1
		}
	}
	var b strings.Builder
	for i := 0; i < n; i++ {
		if bold[i] && (i == 0 || !bold[i-1]) {
			b.WriteString("<b>")
		}
		b.WriteByte(s[i])
		if bold[i] && (i == n-1 || !bold[i+1]) {
			b.WriteString("</b>")
		}
	}
	return b.String()
}
