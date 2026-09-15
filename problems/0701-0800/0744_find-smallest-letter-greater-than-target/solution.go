// Upper bound over the half-open range [lo, hi): the first index whose
// letter is strictly greater than target. The wrap below handles the case
// where no letter qualifies.
func nextGreatestLetter(letters []string, target string) string {
	lo, hi := 0, len(letters)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if letters[mid] <= target {
			// At or below target — not strictly greater — so the answer
			// sits strictly right of mid.
			lo = mid + 1
		} else {
			// letters[mid] > target keeps mid a live candidate.
			hi = mid
		}
	}
	// No letter is strictly greater: wrap to the first letter.
	if lo == len(letters) {
		return letters[0]
	}
	return letters[lo]
}
