import "sort"

func sumDistance(nums []int, s string, d int) int {
	// Collisions only swap identities, so final positions are x +/- d.
	const MOD = 1000000007
	pos := make([]int64, len(nums))
	for i, x := range nums {
		if s[i] == 'R' {
			pos[i] = int64(x) + int64(d)
		} else {
			pos[i] = int64(x) - int64(d)
		}
	}
	sort.Slice(pos, func(i, j int) bool { return pos[i] < pos[j] })
	total := int64(0)
	prefix := int64(0)
	for i, p := range pos {
		total += p*int64(i) - prefix
		total %= MOD
		prefix += p
	}
	ans := ((total % MOD) + MOD) % MOD
	return int(ans)
}
