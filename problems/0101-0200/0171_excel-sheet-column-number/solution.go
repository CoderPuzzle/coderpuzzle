// Bijective base-26, decode side: each letter is a digit worth 1..26, so
// Horner's rule folds the title with no off-by-one repair.
func titleToNumber(columnTitle string) int {
	number := 0
	for _, letter := range []byte(columnTitle) {
		// Shift the digits so far one place left, then add this one.
		number = number*26 + int(letter-'A'+1)
	}
	// The "FXSHRXW" ceiling is exactly 2^31 - 1, so the fold stays in range.
	return number
}
