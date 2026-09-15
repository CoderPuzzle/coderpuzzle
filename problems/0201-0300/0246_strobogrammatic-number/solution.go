// A 180-degree turn reverses digit order and rotates each digit, and only
// 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
func isStrobogrammatic(num string) bool {
	rotated := map[byte]byte{'0': '0', '1': '1', '8': '8', '6': '9', '9': '6'}
	for left, right := 0, len(num)-1; left <= right; left, right = left+1, right-1 {
		// Each digit must be the rotation of the digit standing opposite.
		turn, ok := rotated[num[left]]
		if !ok || turn != num[right] {
			return false
		}
	}
	return true
}
