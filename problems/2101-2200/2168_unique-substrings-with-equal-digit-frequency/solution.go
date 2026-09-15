import "strings"

// For each start index, extend the substring one digit at a time while
// tracking digit counts; the running (distinct digits, max frequency)
// pair tests "every digit appears equally" in O(1) per extension. The
// dedup set stores the substrings as Go strings built by extension.
func equalDigitFrequency(s string) int {
	n := len(s)
	seen := make(map[string]bool)
	for start := 0; start < n; start++ {
		var counts [10]int
		distinct, maxCount := 0, 0
		var builder strings.Builder
		for end := start; end < n; end++ {
			digit := int(s[end] - '0')
			if counts[digit] == 0 {
				distinct++
			}
			counts[digit]++
			if counts[digit] > maxCount {
				maxCount = counts[digit]
			}
			builder.WriteByte(s[end])
			if maxCount*distinct == end-start+1 {
				seen[builder.String()] = true
			}
		}
	}
	return len(seen)
}
