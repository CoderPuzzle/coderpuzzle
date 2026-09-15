import (
	"sort"
	"strings"
)

// Join every other string into one scan text, NUL-separated so a match can
// never straddle a boundary; since candidates contain only lowercase
// letters, one containment test per candidate then covers "occurs in any
// other string". Candidates are tried shortest first and, within a length,
// in sorted order, so the first survivor is both shortest and smallest.
func shortestSubstrings(arr []string) []string {
	answer := make([]string, len(arr))
	for i, s := range arr {
		var text strings.Builder
		for j, other := range arr {
			if j != i {
				text.WriteString(other)
				text.WriteByte(0)
			}
		}
		others := text.String()
		best := ""
		for length := 1; length <= len(s) && best == ""; length++ {
			seen := make(map[string]bool)
			candidates := make([]string, 0, len(s))
			for a := 0; a+length <= len(s); a++ {
				candidate := s[a : a+length]
				if !seen[candidate] {
					seen[candidate] = true
					candidates = append(candidates, candidate)
				}
			}
			sort.Strings(candidates)
			for _, candidate := range candidates {
				if !strings.Contains(others, candidate) {
					best = candidate
					break
				}
			}
		}
		answer[i] = best
	}
	return answer
}
