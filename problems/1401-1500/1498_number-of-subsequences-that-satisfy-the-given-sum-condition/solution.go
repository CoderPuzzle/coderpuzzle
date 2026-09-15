import "sort"

func numSubseq(nums []int, target int) int {
	const MOD = 1000000007
	// A subsequence is defined by membership, not order, so sorting loses
	// nothing; validity then depends only on smallest + largest <= target.
	sort.Ints(nums)
	n := len(nums)
	// Powers of two: elements strictly between the two pointers may be
	// included or excluded freely.
	powers := make([]int, n)
	powers[0] = 1
	for i := 1; i < n; i++ {
		powers[i] = powers[i-1] * 2 % MOD
	}
	total := 0
	lo, hi := 0, n-1
	for lo <= hi {
		if nums[lo]+nums[hi] <= target {
			// hi is the farthest legal partner of lo (earlier decrements
			// rule out anything beyond), so 2^(hi-lo) subsequences have
			// their minimum exactly at lo.
			total = (total + powers[hi-lo]) % MOD
			lo++
		} else {
			// nums[hi] is too large to pair with anything at or after lo.
			hi--
		}
	}
	return total
}
