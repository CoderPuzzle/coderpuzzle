func countPartitions(nums []int, k int) int {
	// Reverse view per the hint: a partition fails when either group's
	// sum lands under k, and both failures coincide only if the total is
	// under 2*k -- then zero great partitions exist outright. Otherwise
	// every subset with sum < k names one failure per side, so the
	// answer is 2^n minus twice their count.
	const MOD = 1000000007
	total := 0
	for _, value := range nums {
		total += value
	}
	if total < 2*k {
		return 0
	}
	// ways[s] holds, mod p, how many subsets of the processed prefix sum
	// to s; rows at k and beyond can never come back below k. Values fit
	// in int (64-bit): at most ~1000 rows summed below the modulus.
	ways := make([]int, k)
	ways[0] = 1
	for _, value := range nums {
		for s := k - 1; s >= value; s-- {
			ways[s] = (ways[s] + ways[s-value]) % MOD
		}
	}
	below := 0
	for _, count := range ways {
		below += count
	}
	below %= MOD
	power := 1
	for i := 0; i < len(nums); i++ {
		power = power * 2 % MOD
	}
	return (power - 2*below%MOD + MOD) % MOD
}
