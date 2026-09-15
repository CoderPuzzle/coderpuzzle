// Greedy append: keep s[i] unless it would extend a run of three. Runs of a
// repeated character are independent, so truncating every maximal run to two
// chars is both minimal (every extra char beyond two in a run must be
// deleted) and the unique answer.
func makeFancyString(s string) string {
	res := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		n := len(res)
		if n >= 2 && res[n-1] == s[i] && res[n-2] == s[i] {
			continue
		}
		res = append(res, s[i])
	}
	return string(res)
}
