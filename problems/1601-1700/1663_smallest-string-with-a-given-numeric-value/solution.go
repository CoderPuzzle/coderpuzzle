// Fill from the end. At a position with i open slots before it, reserve
// one unit per open slot and spend everything else here, capped at z. The
// first time the cap stops binding, the reserve drops to exactly the open
// count and every earlier slot is 'a'.
func getSmallestString(n int, k int) string {
	chars := make([]byte, n)
	remaining := int64(k)
	for i := n - 1; i >= 0; i-- {
		value := remaining - int64(i)
		if value > 26 {
			value = 26
		}
		chars[i] = byte('a' + value - 1)
		remaining -= value
	}
	return string(chars)
}
