import "sort"

// Sort by start point; overlapping ranges then form contiguous runs,
// and each maximal run sits in either group freely, so the answer is
// 2^(runs) mod 1e9+7 by iterative binary exponentiation; int64 absorbs
// the ~10^18 intermediate products safely.
func countWays(ranges [][]int) int {
	const mod = int64(1000000007)
	sort.Slice(ranges, func(i, j int) bool { return ranges[i][0] < ranges[j][0] })
	groups := 1
	reach := ranges[0][1]
	for _, r := range ranges[1:] {
		s, e := r[0], r[1]
		if s > reach {
			groups++
			reach = e
		} else if e > reach {
			reach = e
		}
	}
	result := int64(1)
	base := int64(2) % mod
	for e := int64(groups); e > 0; e >>= 1 {
		if e&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
	}
	return int(result)
}
