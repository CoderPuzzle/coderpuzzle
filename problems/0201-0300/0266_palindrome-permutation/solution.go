// A permutation rearranges into a palindrome exactly when at most one
// character occurs an odd number of times: pairs supply the mirrored halves,
// a lone survivor can stand in the middle.
func canPermutePalindrome(s string) bool {
	oddMask := 0
	for i := 0; i < len(s); i++ {
		// One bit per letter, flipped per occurrence: set bits after the pass
		// are exactly the odd counts.
		oddMask ^= 1 << (s[i] - 'a')
	}
	// mask & (mask - 1) clears the lowest set bit, so it is zero exactly when
	// at most one bit — at most one odd count — remains.
	return oddMask&(oddMask-1) == 0
}
