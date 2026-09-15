// The specials mutate the result built so far: letters append, '*' drops
// the tail, '#' doubles, '%' reverses. With s capped at 20 chars the
// result never exceeds 2^19 characters, so a plain byte slice is cheap
// and obviously correct.
func processStr(s string) string {
	result := []byte{}
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch >= 'a' && ch <= 'z' {
			result = append(result, ch)
		} else if ch == '*' {
			if len(result) > 0 {
				result = result[:len(result)-1]
			}
		} else if ch == '#' {
			// append copies the source elements before any reallocation,
			// so doubling a slice onto itself is well-defined.
			result = append(result, result...)
		} else { // '%'
			for lo, hi := 0, len(result)-1; lo < hi; lo, hi = lo+1, hi-1 {
				result[lo], result[hi] = result[hi], result[lo]
			}
		}
	}
	return string(result)
}
