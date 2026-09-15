// A group is x cards of one value, so once x is picked every count must
// split into whole groups of x: each count a multiple of x, every card in
// exactly one group. A partition exists exactly when some x >= 2 divides
// every count at once, i.e. when the gcd of all counts reaches 2. The fold
// seeds with 0 because gcd(0, c) = c, so each count is absorbed and the
// running value stays the gcd of the counts seen so far.
func hasGroupsSizeX(deck []int) bool {
	counts := map[int]int{}
	for _, card := range deck {
		counts[card]++
	}
	common := 0
	for _, count := range counts {
		common = gcd(common, count)
	}
	return common >= 2
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
