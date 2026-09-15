import "sort"

func sumSubseqWidths(nums []int) int {
	const MOD = 1000000007
	// Width = max - min, so the total is the sum of subsequence maxes
	// minus mins; sorting loses nothing (inner order is irrelevant).
	sort.Ints(nums)
	n := len(nums)
	pow2 := make([]int64, n)
	pow2[0] = 1
	for i := 1; i < n; i++ {
		pow2[i] = pow2[i-1] * 2 % MOD
	}
	total := int64(0)
	for i, x := range nums {
		// x is the max of 2^i subsequences (partners chosen before it) and
		// the min of 2^(n-1-i); each subsequence is booked to exactly one
		// index per role. The extra +MOD repairs the possibly negative
		// difference of the two powers.
		d := pow2[i] - pow2[n-1-i]
		total = ((total+int64(x)*d)%MOD + MOD) % MOD
	}
	return int(total)
}
