// Exactly two alternating targets exist; each position matches one of
// them, so one mismatch count against the 0101... target determines
// both costs.
func minOperations(s string) int {
	mismatch := 0
	for i := 0; i < len(s); i++ {
		if int(s[i]-'0') != i%2 {
			mismatch++
		}
	}
	return min(mismatch, len(s)-mismatch)
}
