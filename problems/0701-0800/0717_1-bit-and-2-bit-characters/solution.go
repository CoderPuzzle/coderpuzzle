// A character starting at a 0 can only be the one-bit character, and a
// character starting at a 1 can only be a two-bit character that also
// swallows the bit after it. So the decode is forced: walk it from the
// left, and the answer is whether the last step starts on the last bit.
func isOneBitCharacter(bits []int) bool {
	i := 0
	n := len(bits)
	for i < n-1 {
		if bits[i] == 1 {
			i += 2
		} else {
			i += 1
		}
	}
	return i == n-1
}
