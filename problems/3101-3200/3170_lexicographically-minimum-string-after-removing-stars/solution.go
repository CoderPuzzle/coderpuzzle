// Each '*' removes the newest surviving copy of the smallest letter seen
// so far; deleting anything larger, or an older copy of that letter, can
// only leave a bigger remainder behind.
func clearStars(s string) string {
	var slots [26][]int
	dropped := make([]bool, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] == '*' {
			dropped[i] = true
			for c := 0; c < 26; c++ {
				if n := len(slots[c]); n > 0 {
					dropped[slots[c][n-1]] = true
					slots[c] = slots[c][:n-1]
					break
				}
			}
		} else {
			c := s[i] - 'a'
			slots[c] = append(slots[c], i)
		}
	}
	kept := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if !dropped[i] {
			kept = append(kept, s[i])
		}
	}
	return string(kept)
}
