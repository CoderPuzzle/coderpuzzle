import "strings"

// Replacements are simultaneous: each match is judged against the original
// string, so first record every operation that succeeds — sources[i] read
// from indices[i] — as a map from start position to operation, then walk s
// once. A position holding a winner emits its target and skips the consumed
// source; every other character copies through unchanged. The non-overlap
// guarantee means a skip never lands inside another winner's span.
func findReplaceString(s string, indices []int, sources []string, targets []string) string {
	n := len(s)
	match := make([]int, n)
	for i := range match {
		match[i] = -1
	}
	for op, start := range indices {
		if strings.HasPrefix(s[start:], sources[op]) {
			match[start] = op
		}
	}
	var result strings.Builder
	i := 0
	for i < n {
		if op := match[i]; op >= 0 {
			result.WriteString(targets[op])
			i += len(sources[op])
		} else {
			result.WriteByte(s[i])
			i++
		}
	}
	return result.String()
}
