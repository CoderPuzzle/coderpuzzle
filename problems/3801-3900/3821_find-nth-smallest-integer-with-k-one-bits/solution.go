func nthSmallest(n int64, k int) int64 {
	// Numbers with exactly k one bits and bit length exactly L are
	// C(L-1, k-1): a leading 1 plus k-1 ones among L-1 free slots, so
	// hockey-sticking over shorter lengths, C(L, k) candidates have
	// length <= L. Grow L until rank n fits, then unrank the rest
	// MSB -> LSB: placing 0 at position p leaves C(p, need) smaller
	// completions, so set the bit whenever the leftover rank exceeds
	// that block. Every binomial tops out at C(50, 25) ~ 1.26e14 and
	// the answer below 2^50 -- int64 arithmetic and int64(1) shifts
	// carry both, since 2^50 overflows int32.
	var C [51][51]int64
	for i := 0; i <= 50; i++ {
		C[i][0] = 1
		for j := 1; j <= i; j++ {
			C[i][j] = C[i-1][j-1] + C[i-1][j]
		}
	}
	length := k
	for C[length][k] < n {
		length++
	}
	r := n - C[length-1][k]
	ans := int64(1) << (length - 1)
	need := k - 1
	for p := length - 2; p >= 0; p-- {
		if r > C[p][need] {
			r -= C[p][need]
			ans |= int64(1) << p
			need--
		}
	}
	return ans
}
