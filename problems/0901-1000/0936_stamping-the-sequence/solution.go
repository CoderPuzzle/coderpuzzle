// Work backwards from target, where stamping forwards becomes erasing: a
// window is erasable once every character in it either equals its stamp
// counterpart or is already '?', because the last stamp to cover a position
// always leaves the stamp's own letter there. Each round takes the leftmost
// erasable window that still contains a letter — erasing it can never block
// the remaining windows, since turning letters into '?' only widens what
// matches — and blanks it. A round that finds nothing while letters remain
// proves the target unreachable; reversing the recorded indices yields the
// stamping order.
func movesToStamp(stamp string, target string) []int {
	m, n := len(stamp), len(target)
	s := []byte(target)
	remaining := n
	recorded := []int{}
	for remaining > 0 {
		found := -1
		for i := 0; i+m <= n; i++ {
			ok := true
			progress := false
			for j := 0; j < m; j++ {
				c := s[i+j]
				if c == '?' {
					continue
				}
				if c != stamp[j] {
					ok = false
					break
				}
				progress = true
			}
			if ok && progress {
				found = i
				break
			}
		}
		if found < 0 {
			return []int{}
		}
		for j := 0; j < m; j++ {
			if s[found+j] != '?' {
				s[found+j] = '?'
				remaining--
			}
		}
		recorded = append(recorded, found)
	}
	for i, j := 0, len(recorded)-1; i < j; i, j = i+1, j-1 {
		recorded[i], recorded[j] = recorded[j], recorded[i]
	}
	return recorded
}
