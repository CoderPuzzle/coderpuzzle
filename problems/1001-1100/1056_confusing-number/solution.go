// Peeling digits off with % 10 / 10 already visits them in the order a
// 180-degree rotation puts them in (units digit first, so it lands
// most-significant in the rotated value).
func confusingNumber(n int) bool {
	rotate := [10]int{0, 1, -1, -1, -1, -1, 9, -1, 8, 6}

	original := n
	rotated := 0
	for n > 0 {
		digit := n % 10
		if rotate[digit] == -1 {
			return false
		}
		rotated = rotated*10 + rotate[digit]
		n /= 10
	}
	return rotated != original
}
