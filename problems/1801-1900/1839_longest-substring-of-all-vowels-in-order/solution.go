import "strings"

// One pass over vowel runs. A beautiful substring is a maximal run of
// non-decreasing vowels containing all five; extend the run while the next
// vowel is >= the current one, then score it.
func longestBeautifulSubstring(word string) int {
	order := "aeiou"
	best := 0
	n := len(word)
	i := 0
	for i < n {
		if word[i] != 'a' {
			i++
			continue
		}
		seen := 1 // bit 0 set: 'a' present
		j := i + 1
		for j < n && word[j] >= word[j-1] {
			seen |= 1 << strings.IndexByte(order, word[j])
			j++
		}
		if seen == 31 {
			if j-i > best {
				best = j - i
			}
		}
		if j > i {
			i = j
		} else {
			i++
		}
	}
	return best
}
