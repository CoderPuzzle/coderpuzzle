// Walk two pointers inward while the outer pairs agree. The first mismatch
// is the only place a deletion can matter: it must remove one end of the
// broken pair, so the answer is whether the stretch without the left char
// or the stretch without the right char is an exact palindrome. An unbroken
// walk needs no deletion at all.
func validPalindrome(s string) bool {
	lo, hi := 0, len(s)-1
	for lo < hi {
		if s[lo] != s[hi] {
			return isPalindrome(s, lo+1, hi) || isPalindrome(s, lo, hi-1)
		}
		lo++
		hi--
	}
	return true
}

// Exact palindrome test on the inclusive index range [lo, hi].
func isPalindrome(s string, lo, hi int) bool {
	for lo < hi {
		if s[lo] != s[hi] {
			return false
		}
		lo++
		hi--
	}
	return true
}
