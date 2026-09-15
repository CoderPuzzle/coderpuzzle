// Alice wins exactly when the board already folds to 0 (she wins on the
// spot) or the count is even, letting her always hand Bob a nonzero odd
// board he cannot escape.
func xorGame(nums []int) bool {
	total := 0
	for _, value := range nums {
		total ^= value
	}
	return total == 0 || len(nums)%2 == 0
}
