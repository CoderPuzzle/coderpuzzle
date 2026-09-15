// A group is happy when the donut count before it is 0 mod batchSize, so
// the ordering matters only through remainders. Remainder-0 groups are
// always happy, complementary remainders pair into zero-sum blocks, and
// the memoized DP places what is left. Each remainder class count fits
// 5 bits (n <= 30), so a packed state key fits comfortably in a uint64.
func maxHappyGroups(batchSize int, groups []int) int {
	k := batchSize
	freq := make([]int, k)
	for _, g := range groups {
		freq[g%k]++
	}
	ans := freq[0]
	freq[0] = 0
	for i, j := 1, k-1; i < j; i, j = i+1, j-1 {
		m := min(freq[i], freq[j])
		ans += m
		freq[i] -= m
		freq[j] -= m
	}
	if k%2 == 0 {
		h := k / 2
		ans += freq[h] / 2
		freq[h] %= 2
	}
	var state uint64
	for c := 1; c < k; c++ {
		state |= uint64(freq[c]) << (5 * (c - 1))
	}
	memo := make(map[uint64]int)
	var dp func(state uint64, r int) int
	dp = func(state uint64, r int) int {
		if state == 0 {
			return 0
		}
		key := state<<4 | uint64(r)
		if cached, ok := memo[key]; ok {
			return cached
		}
		best := 0
		for c := 1; c < k; c++ {
			count := int(state >> (5 * (c - 1)) & 31)
			if count > 0 {
				gain := 0
				if r == 0 {
					gain = 1
				}
				if cand := gain + dp(state-1<<(5*(c-1)), (r+c)%k); cand > best {
					best = cand
				}
			}
		}
		memo[key] = best
		return best
	}
	return ans + dp(state, 0)
}
