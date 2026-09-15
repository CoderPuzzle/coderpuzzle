// A word is banned or it is not: collapse bannedWords into a hash set
// (internal duplicates collapse harmlessly). Scan the message counting every
// occurrence that lands in the set — the same banned word twice in the message
// counts twice — and stop as soon as two matches have been seen; on a 10^5-word
// message the early exit can skip the rest.
func reportSpam(message []string, bannedWords []string) bool {
	banned := make(map[string]struct{}, len(bannedWords))
	for _, w := range bannedWords {
		banned[w] = struct{}{}
	}
	count := 0
	for _, w := range message {
		if _, hit := banned[w]; hit {
			count++
			if count == 2 {
				return true
			}
		}
	}
	return false
}
