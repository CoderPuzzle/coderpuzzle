func reverseByType(s string) string {
	// The two reversals act on disjoint position sets — a slot that
	// starts on a letter ends on a letter — so each class can be
	// reversed independently, in place. Each pass walks two pointers
	// inward from the ends, skipping characters outside the class
	// being reversed, and swaps when both sides are on the class.
	chars := []byte(s)
	n := len(chars)

	isLetter := func(c byte) bool { return c >= 'a' && c <= 'z' }

	i, j := 0, n-1
	for i < j {
		if !isLetter(chars[i]) {
			i++
		} else if !isLetter(chars[j]) {
			j--
		} else {
			chars[i], chars[j] = chars[j], chars[i]
			i++
			j--
		}
	}

	i, j = 0, n-1
	for i < j {
		if isLetter(chars[i]) {
			i++
		} else if isLetter(chars[j]) {
			j--
		} else {
			chars[i], chars[j] = chars[j], chars[i]
			i++
			j--
		}
	}
	return string(chars)
}
