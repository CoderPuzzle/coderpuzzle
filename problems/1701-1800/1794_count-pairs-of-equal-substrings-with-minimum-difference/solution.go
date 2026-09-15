// Only single-character pairs can be optimal: a longer match shrinks to
// its two leading characters (same a, smaller j), and each letter does
// best pairing its first occurrence here with its last occurrence there.
func countQuadruples(firstString string, secondString string) int {
	n1 := len(firstString)
	var first, last [26]int
	for c := range first {
		first[c] = n1
		last[c] = -1
	}
	for i := 0; i < n1; i++ {
		c := int(firstString[i] - 'a')
		if first[c] == n1 {
			first[c] = i
		}
	}
	for a := 0; a < len(secondString); a++ {
		last[int(secondString[a]-'a')] = a
	}
	best, count := 0, 0
	any := false
	for c := 0; c < 26; c++ {
		if first[c] == n1 || last[c] == -1 {
			continue
		}
		diff := first[c] - last[c]
		if !any || diff < best {
			any = true
			best = diff
			count = 1
		} else if diff == best {
			count++
		}
	}
	return count
}
