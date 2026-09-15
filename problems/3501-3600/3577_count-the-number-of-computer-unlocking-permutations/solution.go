// Computer i can only be unlocked through some already-unlocked j < i with
// lower complexity, so the leftmost minimum of the whole array can never be
// unlocked unless it is computer 0 itself: no smaller label exists to
// unlock it through. Hence the answer is (n - 1)! when complexity[0] is
// the strict minimum, else 0.
func countPermutations(complexity []int) int {
	const MOD = int64(1000000007)
	for i := 1; i < len(complexity); i++ {
		if complexity[i] <= complexity[0] {
			return 0
		}
	}
	var count int64 = 1
	for multiplier := int64(2); multiplier < int64(len(complexity)); multiplier++ {
		count = count * multiplier % MOD
	}
	return int(count)
}
