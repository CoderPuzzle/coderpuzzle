func makeSmallestPalindrome(s string) string {
	// A mismatched mirror pair needs one rewrite whichever letter wins;
	// keeping the smaller is never worse for any earlier position.
	chars := []byte(s)
	for left, right := 0, len(chars)-1; left < right; left, right = left+1, right-1 {
		if chars[left] != chars[right] {
			keep := chars[left]
			if chars[right] < keep {
				keep = chars[right]
			}
			chars[left] = keep
			chars[right] = keep
		}
	}
	return string(chars)
}
