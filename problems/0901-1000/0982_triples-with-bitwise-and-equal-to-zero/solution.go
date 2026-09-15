// A triple's AND vanishes exactly when the first two values' AND is a submask
// of the third value's complement. One pass over all n^2 ordered pairs
// records f[v] = pairs with nums[i] & nums[j] == v, a subset zeta transform
// turns f into h[m] = sum of f over the submasks of m, and each k then
// contributes h[^nums[k] & 0xFFFF].
func countTriplets(nums []int) int64 {
	full := 1 << 16
	f := make([]int64, full)
	for _, x := range nums {
		for _, y := range nums {
			f[x&y]++
		}
	}
	for b := 0; b < 16; b++ {
		bit := 1 << b
		for mask := 0; mask < full; mask++ {
			if mask&bit != 0 {
				f[mask] += f[mask^bit]
			}
		}
	}
	var answer int64
	for _, x := range nums {
		answer += f[^x&0xFFFF]
	}
	return answer
}
