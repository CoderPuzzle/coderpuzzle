import "sort"

func minimizeStringValue(s string) string {
	// A letter appearing x times costs x*(x-1)/2 no matter where it sits, so
	// only the final counts matter: each '?' should take the currently least
	// frequent letter (smallest letter on ties — that also makes the fill
	// lexicographically smallest). The chosen letters are then sorted into
	// the '?' slots left to right. Scanning all 26 counts per '?' is O(26n),
	// well within n = 1e5.
	counts := make([]int, 26)
	for i := 0; i < len(s); i++ {
		if s[i] != '?' {
			counts[s[i]-'a']++
		}
	}
	var picks []int
	for i := 0; i < len(s); i++ {
		if s[i] == '?' {
			best := 0
			for letter := 1; letter < 26; letter++ {
				if counts[letter] < counts[best] {
					best = letter
				}
			}
			counts[best]++
			picks = append(picks, best)
		}
	}
	sort.Ints(picks)
	characters := []byte(s)
	at := 0
	for i, ch := range characters {
		if ch == '?' {
			characters[i] = byte('a' + picks[at])
			at++
		}
	}
	return string(characters)
}
