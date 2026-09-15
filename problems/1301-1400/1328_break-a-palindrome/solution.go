func breakPalindrome(palindrome string) string {
	// One change in the first half decides lexicographic order; lower the
	// first non-'a' there to 'a'. All-'a' halves force the last spot to 'b';
	// length 1 can never stop being a palindrome.
	n := len(palindrome)
	if n == 1 {
		return ""
	}
	text := []byte(palindrome)
	for i := 0; i < n/2; i++ {
		if text[i] != 'a' {
			text[i] = 'a'
			return string(text)
		}
	}
	text[n-1] = 'b'
	return string(text)
}
