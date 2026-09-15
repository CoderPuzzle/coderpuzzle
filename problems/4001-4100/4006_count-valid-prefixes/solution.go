// A prefix rearranges into an alternating string exactly when its counts of
// '0' and '1' differ by at most one, so track both running counts through one
// pass and count the prefixes whose balance stays within one.
func countValidPrefixes(s string) int {
	zeros, ones, valid := 0, 0, 0
	for i := 0; i < len(s); i++ {
		if s[i] == '0' {
			zeros++
		} else {
			ones++
		}
		balance := zeros - ones
		if balance < 0 {
			balance = -balance
		}
		if balance <= 1 {
			valid++
		}
	}
	return valid
}
