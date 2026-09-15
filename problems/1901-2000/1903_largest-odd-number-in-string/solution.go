// The largest odd substring must be a prefix: `num` has no leading
// zeros, so a longer number always outvalues a shorter one, and the
// best candidate starts at index 0. A prefix is odd exactly when it
// ends on an odd digit, so the answer is the prefix ending at the
// rightmost odd digit — any earlier cut is shorter, any later one is
// even. One backward scan finds that cut; no odd digit at all means
// no odd substring exists and the answer is empty. Only characters
// are compared, so the 10^5-digit bound never becomes arithmetic in
// any language.
func largestOddNumber(num string) string {
	for i := len(num) - 1; i >= 0; i-- {
		d := num[i] - '0'
		if d%2 == 1 {
			return num[:i+1]
		}
	}
	return ""
}
