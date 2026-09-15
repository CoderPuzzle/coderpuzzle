import "strconv"

func goodIndices(s string) []int {
	// A matching substring must be exactly as long as i's decimal
	// representation, so every index has just one candidate: the
	// suffix of that length ending at i. Comparing that window
	// against the digits of i decides the index — representations
	// never carry a leading zero, so a window like "01" fails
	// plainly against the real digits of i.
	res := []int{}
	for i := 0; i < len(s); i++ {
		t := strconv.Itoa(i)
		j := i - len(t) + 1
		if j >= 0 && s[j:i+1] == t {
			res = append(res, i)
		}
	}
	return res
}
