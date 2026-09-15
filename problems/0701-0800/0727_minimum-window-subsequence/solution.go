// nxt[i][c] answers "where is the first character c at or after i?" in one
// lookup: a backward sweep copies each row from its successor and overwrites
// the column of the character sitting at i; row n is all sentinels, so every
// failed jump lands on n and ends the walk.
func minWindow(s1 string, s2 string) string {
	n, m := len(s1), len(s2)
	nxt := make([][26]int, n+1)
	for c := range nxt[n] {
		nxt[n][c] = n
	}
	for i := n - 1; i >= 0; i-- {
		nxt[i] = nxt[i+1]
		nxt[i][s1[i]-'a'] = i
	}
	// A minimum window must open on s2[0] — otherwise its head could be cut
	// for a strictly shorter valid window — so walking from every such opening
	// and always jumping to the earliest continuation visits every candidate.
	// Scanning openings left to right and keeping only strictly shorter
	// windows leaves the leftmost one among equal-length winners.
	bestLen, bestStart := n+1, -1
	for i := 0; i < n; i++ {
		if s1[i] != s2[0] {
			continue
		}
		pos, ok := i, true
		for k := 1; k < m; k++ {
			pos = nxt[pos+1][s2[k]-'a']
			if pos == n {
				ok = false
				break
			}
		}
		if ok && pos-i+1 < bestLen {
			bestLen = pos - i + 1
			bestStart = i
			if bestLen == m { // |s2| is the unavoidable lower bound
				break
			}
		}
	}
	if bestStart < 0 {
		return ""
	}
	return s1[bestStart : bestStart+bestLen]
}
