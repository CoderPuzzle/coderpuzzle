import "strings"

func filterCharacters(s string, k int) string {
	// Tally every occurrence into a fixed 26-slot table; the lowercase-
	// only input makes each index a plain offset from 'a'.
	var counts [26]int
	for _, ch := range s {
		counts[ch-'a']++
	}
	// Scan left to right, keeping exactly the characters whose total count
	// is strictly below the threshold; original order falls out of the
	// scan for free.
	var result strings.Builder
	for _, ch := range s {
		if counts[ch-'a'] < k {
			result.WriteRune(ch)
		}
	}
	return result.String()
}
