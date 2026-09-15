import "strconv"

func splitMessage(message string, limit int) []string {
	// digitLen[i] = total decimal digit count of integers 1..i, so each
	// candidate part count b costs O(1) instead of O(b).
	n := len(message)
	digitLen := make([]int, n+1)
	for x := 1; x <= n; x++ {
		digitLen[x] = digitLen[x-1] + len(strconv.Itoa(x))
	}
	for b := 1; b <= n; b++ {
		digitsB := len(strconv.Itoa(b))
		if 2*digitsB+3 > limit {
			break // the widest suffix "<b/b>" won't fit
		}
		// Capacity: sum over a=1..b of (limit - len(str(a)) - digitsB - 3).
		capacity := b*limit - digitLen[b] - b*digitsB - 3*b
		if capacity < n {
			continue
		}
		parts := make([]string, 0, b)
		pos := 0
		for a := 1; a <= b; a++ {
			suffix := "<" + strconv.Itoa(a) + "/" + strconv.Itoa(b) + ">"
			take := limit - len(suffix)
			if n-pos < take {
				take = n - pos
			}
			parts = append(parts, message[pos:pos+take]+suffix)
			pos += take
		}
		return parts
	}
	return []string{}
}
