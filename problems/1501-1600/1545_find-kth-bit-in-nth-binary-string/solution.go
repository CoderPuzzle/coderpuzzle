// Peel levels off from n down to 1 instead of building S(n). At each level,
// k either falls in the S(n-1) copy unchanged, lands exactly on the
// inserted "1", or falls in the inverted mirror of S(n-1) — in which case
// it maps back to a position in S(n-1) and the final answer needs one more
// inversion.
func findKthBit(n int, k int) string {
	invert := false
	for n > 1 {
		half := 1 << (n - 1) // len(S(n-1)), and S(n)'s middle position
		if k == half {
			if invert {
				return "0"
			}
			return "1"
		}
		if k > half {
			k = 2*half - k
			invert = !invert
		}
		n--
	}
	if invert {
		return "1"
	}
	return "0"
}
