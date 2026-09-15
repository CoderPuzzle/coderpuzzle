// Cell (i, j) of the answer is 1 - image[i][n-1-j]: the reversal and the
// inversion fold into a single exchange, so one two-pointer sweep per row
// writes row[left]^1 and row[right]^1 in one swap. XOR by 1 is the invert —
// 0^1 = 1, 1^1 = 0. The middle cell of an odd-width row meets only itself
// in the sweep, so it is inverted once, in place, afterwards.
func flipAndInvertImage(image [][]int) [][]int {
	n := len(image)
	for _, row := range image {
		for left, right := 0, n-1; left < right; left, right = left+1, right-1 {
			a, b := row[left]^1, row[right]^1
			row[left], row[right] = b, a
		}
		if n%2 == 1 {
			row[n/2] ^= 1
		}
	}
	return image
}
