// Grow c until the blocks of all lengths up to c cover k: there are 2^len
// lucky numbers of length len, cumulatively 2^(c + 1) - 2.
func kthLuckyNumber(k int) string {
	c := 1
	for (1<<(c+1))-2 < k {
		c++
	}
	// Rank of k among the c-digit lucky numbers, made zero-based.
	x := k - ((1 << c) - 2) - 1
	// Binary counting in order: read x's c bits from the top, mapping
	// 0 -> 4 and 1 -> 7; bit order mirrors digit order, so this
	// enumerates the block exactly as the statement sorts it.
	digits := make([]byte, c)
	for bit := 0; bit < c; bit++ {
		if (x>>(c-1-bit))&1 == 1 {
			digits[bit] = '7'
		} else {
			digits[bit] = '4'
		}
	}
	return string(digits)
}
