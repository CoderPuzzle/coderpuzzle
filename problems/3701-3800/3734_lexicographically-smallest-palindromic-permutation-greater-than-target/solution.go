import "strings"

func lexPalindromicPermutation(s string, target string) string {
	n := len(s)
	// Counts of each letter of s.
	var freq [26]int
	for i := 0; i < n; i++ {
		freq[s[i]-'a']++
	}
	// Parity law: every count even, or exactly one odd count absorbed by
	// the middle character when n is odd.
	odds, oddLetter := 0, -1
	for d := 0; d < 26; d++ {
		if freq[d]%2 == 1 {
			odds++
			oddLetter = d
		}
	}
	if odds != n%2 {
		return ""
	}
	// The half multiset is forced — freq[d]/2 of every letter — and on odd
	// lengths the odd letter pins the middle, so comparing palindromes
	// reduces to comparing (half, middle, mirrored half).
	var half [26]int
	for d := 0; d < 26; d++ {
		half[d] = freq[d] / 2
	}
	m := n / 2
	p := target[:m]
	// Candidate 1: keep the half equal to target's own first half p. That
	// pins the entire palindrome, which qualifies only if it already
	// clears target past the shared prefix.
	best := ""
	found := false
	var pc [26]int
	for i := 0; i < m; i++ {
		pc[p[i]-'a']++
	}
	matches := true
	for d := 0; d < 26; d++ {
		if pc[d] != half[d] {
			matches = false
		}
	}
	if matches {
		rev := make([]byte, m)
		for i := 0; i < m; i++ {
			rev[i] = p[m-1-i]
		}
		mirrored := string(rev)
		suffix := target[m+n%2:]
		var wins bool
		if n%2 == 0 {
			wins = mirrored > suffix
		} else {
			mid := target[m] - 'a'
			wins = oddLetter > int(mid) ||
				(oddLetter == int(mid) && mirrored > suffix)
		}
		if wins {
			best = p
			found = true
		}
	}
	// Candidate 2: the smallest half arrangement strictly greater than p —
	// match p as far as possible, remembering the latest position where a
	// larger still-available letter existed, and fall back to it.
	if !found {
		cur := half
		bumpAt, bumpCh := -1, -1
		var bumpCur [26]int
		for i := 0; i < m; i++ {
			ci := p[i] - 'a'
			for d := ci + 1; d < 26; d++ {
				if cur[d] > 0 {
					bumpAt, bumpCh = i, int(d)
					bumpCur = cur
					break
				}
			}
			if cur[ci] == 0 {
				break
			}
			cur[ci]--
		}
		if bumpAt >= 0 {
			bumpCur[bumpCh]--
			var sb strings.Builder
			sb.WriteString(target[:bumpAt])
			sb.WriteByte(byte('a' + bumpCh))
			for d := 0; d < 26; d++ {
				for k := 0; k < bumpCur[d]; k++ {
					sb.WriteByte(byte('a' + d))
				}
			}
			best = sb.String()
			found = true
		}
	}
	if !found {
		return ""
	}
	var result strings.Builder
	result.WriteString(best)
	if n%2 == 1 {
		result.WriteByte(byte('a' + oddLetter))
	}
	for i := m - 1; i >= 0; i-- {
		result.WriteByte(best[i])
	}
	return result.String()
}
