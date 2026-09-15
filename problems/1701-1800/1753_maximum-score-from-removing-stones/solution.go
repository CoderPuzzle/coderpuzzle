// With x <= y <= z the answer is min(x + y, total / 2): the smaller
// piles limit how often the big one can be paired, and each move
// spends exactly two stones.
func maximumScore(a int, b int, c int) int {
	x := min(a, min(b, c))
	z := max(a, max(b, c))
	y := a + b + c - x - z
	if x+y <= z {
		return x + y
	}
	return (x + y + z) / 2
}
