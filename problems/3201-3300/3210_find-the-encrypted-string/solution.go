// The encrypted string is the input rotated left by k positions: position i
// of the answer reads s[(i + k) % n], the character k places forward with
// wraparound. The modulo folds completed laps back into range, so k larger
// than n needs no special case — one linear pass copies every character from
// its source index.
func getEncryptedString(s string, k int) string {
	n := len(s)
	encrypted := make([]byte, n)
	for i := 0; i < n; i++ {
		encrypted[i] = s[(i+k)%n]
	}
	return string(encrypted)
}
