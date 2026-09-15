// A long press only stretches a character into a run of copies of itself.
// Walk both strings with two pointers: a typed character equal to the next
// wanted one consumes it, a typed character equal to its predecessor is a
// repeat of one already consumed, and anything else cannot occur. Name must
// be fully consumed at the end.
func isLongPressedName(name string, typed string) bool {
	i, j := 0, 0
	n, m := len(name), len(typed)
	for j < m {
		if i < n && name[i] == typed[j] {
			i++
			j++
		} else if j > 0 && typed[j] == typed[j-1] {
			j++ // a long press of the previous character
		} else {
			return false
		}
	}
	return i == n
}
