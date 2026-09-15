import "strings"

func lexGreaterPermutation(s string, target string) string {
	// Counts of the letters still unused while the built prefix keeps
	// matching target position by position.
	var freq [26]int
	for i := 0; i < len(s); i++ {
		freq[s[i]-'a']++
	}
	// The most recent position where a letter strictly greater than
	// target[i] was still available: that bump point plus the count
	// snapshot taken there is the best fallback completion.
	bumpAt := -1
	var bumpCh byte
	var bumpFreq [26]int
	for i := 0; i < len(target); i++ {
		ci := target[i] - 'a'
		for d := ci + 1; d < 26; d++ {
			if freq[d] > 0 {
				bumpAt = i
				bumpCh = byte('a' + d)
				bumpFreq = freq
				break
			}
		}
		if freq[ci] == 0 {
			break
		}
		freq[ci]--
	}
	if bumpAt < 0 {
		return ""
	}
	// Matched prefix, then the bump letter, then everything left in
	// ascending order — the smallest tail this multiset allows.
	var result strings.Builder
	result.WriteString(target[:bumpAt])
	result.WriteByte(bumpCh)
	bumpFreq[bumpCh-'a']--
	for d := 0; d < 26; d++ {
		for k := 0; k < bumpFreq[d]; k++ {
			result.WriteByte(byte('a' + d))
		}
	}
	return result.String()
}
