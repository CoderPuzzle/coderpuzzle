// Only the two digit totals matter, and one pass can carry both at once:
// add every digit sitting at an even index and subtract every digit at an
// odd index. The even- and odd-index sums are equal exactly when the
// signed total ends back at zero, so no second pass or pair of
// accumulators is needed.
func isBalanced(num string) bool {
	balance := 0
	for i := 0; i < len(num); i++ {
		if i%2 == 0 {
			balance += int(num[i] - '0')
		} else {
			balance -= int(num[i] - '0')
		}
	}
	return balance == 0
}
