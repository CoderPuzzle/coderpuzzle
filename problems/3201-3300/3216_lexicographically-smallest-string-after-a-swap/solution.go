// Go strings are immutable, so the scan runs on a byte slice — the honest
// equivalent of the in-place algorithm. The first adjacent same-parity
// descent is the only swap worth making: it lowers an earlier position than
// any later legal swap could.
func getSmallestString(s string) string {
	chars := []byte(s)
	for i := 0; i+1 < len(chars); i++ {
		if chars[i] > chars[i+1] && (chars[i]-'0')%2 == (chars[i+1]-'0')%2 {
			// At most one swap is allowed, so stop right after it.
			chars[i], chars[i+1] = chars[i+1], chars[i]
			break
		}
	}
	return string(chars)
}
