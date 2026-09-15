// A digit's validity never depends on where it sits, only on how often it
// occurs in the whole string, so one counting pass settles every question the
// scan will ask.
func findValidPair(s string) string {
	counts := [10]int{}
	for i := 0; i < len(s); i++ {
		counts[s[i]-'0']++
	}
	for i := 0; i+1 < len(s); i++ {
		a, b := int(s[i]-'0'), int(s[i+1]-'0')
		// Valid when the digits differ and each occurs exactly as many
		// times as its numeric value.
		if a != b && counts[a] == a && counts[b] == b {
			return s[i : i+2]
		}
	}
	return ""
}
