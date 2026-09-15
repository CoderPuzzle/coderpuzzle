import "strings"

func countWordOccurrences(chunks []string, queries []string) []int {
	var text strings.Builder
	for _, chunk := range chunks {
		text.WriteString(chunk)
	}
	s := text.String()
	counts := make(map[string]int)
	current := []byte{}

	flush := func() {
		if len(current) > 0 {
			counts[string(current)]++
			current = current[:0]
		}
	}

	for i := 0; i < len(s); i++ {
		c := s[i]
		if c == '-' {
			previous := i > 0 && s[i-1] >= 'a' && s[i-1] <= 'z'
			next := i+1 < len(s) && s[i+1] >= 'a' && s[i+1] <= 'z'
			if previous && next {
				current = append(current, c)
			} else {
				flush()
			}
		} else if c >= 'a' && c <= 'z' {
			current = append(current, c)
		} else {
			flush()
		}
	}
	flush()

	answer := make([]int, len(queries))
	for i, query := range queries {
		answer[i] = counts[query]
	}
	return answer
}
