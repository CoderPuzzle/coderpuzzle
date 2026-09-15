func sumOfPower(nums []int, k int) int {
	// A subsequence T with sum k and length j is contained in exactly
	// 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
	// where count[j][s] counts length-j subsequences of sum s — a 0/1
	// knapsack filled with j and s both descending. Elements above k can
	// never join a sum-k subsequence, so they are skipped outright. The
	// weight products reach ~10^18, so the reduction runs in int64.
	const MOD = 1_000_000_007
	n := len(nums)
	counts := make([][]int64, n+1)
	for j := range counts {
		counts[j] = make([]int64, k+1)
	}
	counts[0][0] = 1
	used := 0
	for _, num := range nums {
		if num > k {
			continue
		}
		used++
		for j := used; j > 0; j-- {
			for s := k; s >= num; s-- {
				counts[j][s] = (counts[j][s] + counts[j-1][s-num]) % MOD
			}
		}
	}
	var total, power int64 = 0, 1
	for j := n; j > 0; j-- {
		total = (total + counts[j][k]*power) % MOD
		power = power * 2 % MOD
	}
	return int(total)
}
