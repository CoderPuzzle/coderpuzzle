// Order matters, so the table is indexed by the total alone: each sequence
// reaching t is identified by its last element, making ways[t] the sum of
// ways[t - x] over every final pick x <= t. int64 accumulation keeps the
// running counts safe before the answer lands back inside 32 bits.
func combinationSum4(nums []int, target int) int {
	ways := make([]int64, target+1)
	ways[0] = 1 // the empty sequence: exactly one way to build 0
	for t := 1; t <= target; t++ {
		for _, x := range nums {
			if x <= t {
				ways[t] += ways[t-x]
			}
		}
	}
	return int(ways[target])
}
