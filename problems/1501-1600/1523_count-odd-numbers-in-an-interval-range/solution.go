// The count of odd numbers in [0, n] is (n + 1) / 2; the answer is the
// difference of that prefix count at high and at low - 1 (equivalently
// low / 2, since the +1/-1 cancel).
func countOdds(low int, high int) int {
	return (high+1)/2 - low/2
}
