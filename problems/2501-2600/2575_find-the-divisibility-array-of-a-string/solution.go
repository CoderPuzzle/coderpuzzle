// Rolling remainder over digit prefixes: if r was word[0..i-1] mod m,
// then appending digit d gives (10*r + d) mod m, so each flag costs one
// multiply-add-mod instead of re-parsing the prefix; int64 absorbs the
// ~10^10 intermediate (r < m <= 10^9, so 10*r + d just exceeds the
// 32-bit range).
func divisibilityArray(word string, m int) []int {
	div := make([]int, len(word))
	rem := int64(0)
	for i := 0; i < len(word); i++ {
		rem = (rem*10 + int64(word[i]-'0')) % int64(m)
		if rem == 0 {
			div[i] = 1
		}
	}
	return div
}
