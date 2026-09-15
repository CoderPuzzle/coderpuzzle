// Every element is 1..6, hence 5-smooth: val is always the rational
// 2^a * 3^b * 5^c, and each action shifts the exponent triple by +e, -e,
// or 0, where e is the element's own (2, 3, 5) split. A sequence wins
// exactly when the final triple matches k's, so k keeping any prime
// factor above 5 is an immediate 0. A triple packs into one key
// ((a+40)*41 + b+20)*41 + (c+20): |a| <= 2n <= 38 and |b|, |c| <= n <= 19
// keep the low digits inside a stride of 41, so key +/- the element's
// packed step never borrows across digits.
func countSequences(nums []int, k int64) int {
	primes := [3]int64{2, 3, 5}
	var t [3]int64
	for i, p := range primes {
		for k%p == 0 {
			k /= p
			t[i]++
		}
	}
	if k != 1 {
		return 0
	}
	target := ((t[0]+40)*41+(t[1]+20))*41 + (t[2] + 20)
	dp := map[int64]int64{(40*41+20)*41 + 20: 1}
	for _, v := range nums {
		var e [3]int64
		w := int64(v)
		for i, p := range primes {
			for w%p == 0 {
				w /= p
				e[i]++
			}
		}
		step := (e[0]*41+e[1])*41 + e[2]
		ndp := make(map[int64]int64, len(dp)*3)
		for key, wt := range dp {
			// multiply by v, leave val alone, divide by v
			for _, nk := range [3]int64{key + step, key, key - step} {
				ndp[nk] += wt
			}
		}
		dp = ndp
	}
	// Every count is bounded by the total sequence count
	// 3^19 = 1,162,261,467, inside 32 bits; accumulators run in int64.
	return int(dp[target])
}
