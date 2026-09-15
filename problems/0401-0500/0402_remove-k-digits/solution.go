func removeKdigits(num string, k int) string {
	stack := make([]byte, 0, len(num))
	for i := 0; i < len(num); i++ {
		ch := num[i]
		// A kept digit larger than the arriving one should go: a smaller
		// digit in a more significant position outweighs anything later.
		for k > 0 && len(stack) > 0 && stack[len(stack)-1] > ch {
			stack = stack[:len(stack)-1]
			k--
		}
		stack = append(stack, ch)
	}
	// Unspent removals mean the digits were non-decreasing; drop from the
	// end, where the largest digits sit.
	if k > 0 {
		stack = stack[:len(stack)-k]
	}
	// Strip leading zeros; a fully consumed input yields "0", not "".
	pos := 0
	for pos < len(stack) && stack[pos] == '0' {
		pos++
	}
	result := string(stack[pos:])
	if result == "" {
		return "0"
	}
	return result
}
