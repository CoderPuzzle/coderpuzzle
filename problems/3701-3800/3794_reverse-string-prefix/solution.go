func reversePrefix(s string, k int) string {
	// Mutable buffer; two pointers close on the middle of the prefix.
	// Lowercase ASCII guarantees bytes and characters coincide.
	chars := []byte(s)
	left, right := 0, k-1
	for left < right {
		chars[left], chars[right] = chars[right], chars[left]
		left++
		right--
	}
	return string(chars)
}
