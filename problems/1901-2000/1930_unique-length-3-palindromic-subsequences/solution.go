import "strings"

func countPalindromicSubsequence(s string) int {
	count := 0
	for c := byte('a'); c <= 'z'; c++ {
		// Palindrome c-y-c exists iff some y sits strictly between the first
		// and last occurrence of c: anchoring the outers at the outermost
		// occurrences is the most permissive choice.
		first := strings.IndexByte(s, c)
		if first == -1 {
			continue
		}
		last := strings.LastIndexByte(s, c)
		if last-first >= 2 { // adjacent or single occurrence: no middle room
			// Distinct chars only (a bitmap, not positions) so each
			// palindrome is counted once despite repeated middle letters.
			var seen [26]bool
			for i := first + 1; i < last; i++ {
				seen[s[i]-'a'] = true
			}
			for _, b := range seen {
				if b {
					count++
				}
			}
		}
	}
	return count
}
