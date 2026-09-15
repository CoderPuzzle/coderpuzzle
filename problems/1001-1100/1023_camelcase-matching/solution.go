// Two-pointer scan: advance the pattern pointer on a match, skip a
// lowercase letter as an implicit insertion, and reject outright on an
// uppercase letter that doesn't match. The query matches only if every
// pattern character was consumed by the end of the scan.
func camelMatch(queries []string, pattern string) []bool {
	answer := make([]bool, len(queries))
	for i, query := range queries {
		answer[i] = matchesPattern(query, pattern)
	}
	return answer
}

func matchesPattern(query string, pattern string) bool {
	j := 0
	for _, c := range query {
		if j < len(pattern) && byte(c) == pattern[j] {
			j++
		} else if c >= 'A' && c <= 'Z' {
			return false
		}
	}
	return j == len(pattern)
}
