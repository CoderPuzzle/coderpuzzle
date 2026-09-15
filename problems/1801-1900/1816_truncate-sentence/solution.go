// Cut right after the k-th word: each space closes one word, so the k-th
// space (when it exists) sits exactly at the cut point.
func truncateSentence(s string, k int) string {
	count := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ' ' {
			count++
			if count == k {
				return s[:i]
			}
		}
	}
	return s
}
