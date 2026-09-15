func minEnd(n int, x int) int64 {
	// Every element must contain every bit of x, so candidates are exactly
	// the supersets of x, ascending — their counter is spread over the zero
	// positions of x. The answer merges x with (n - 1): walk bit slots
	// upward, pushing each bit of (n - 1) into the next zero slot of x.
	// Answers reach up to bit 52 (x <= 10^8 keeps one of the low 27 bits
	// free, so free rank r lands at position <= r + 26), inside int64.
	ans := int64(x)
	k := int64(n - 1)
	bit := uint(0)
	for k != 0 {
		if (ans>>bit)&1 == 0 {
			if k&1 == 1 {
				ans |= 1 << bit
			}
			k >>= 1
		}
		bit++
	}
	return ans
}
