// The total factors as M * T with M = n(n-1)/2 and T the per-bit count of
// (j OR k) over all pairs; M*T <= s iff T <= s / M, which avoids oversized
// products. The doubling stops at hi <= 2^14 (T >= sum of j over [n/2, n)
// pushes the total at 2^14 past 1e15 >= s), and s <= 1e15 with
// T <= 2n*M < 4.4e12 keeps every intermediate within int64.
func maxSizedArray(s int64) int {
	fits := func(n int) bool {
		if n <= 1 {
			return true
		}
		m := int64(n) * int64(n-1) / 2
		var total int64
		for b := 0; 1<<b < 2*n; b++ {
			setCount := int64(n>>(b+1)) << b
			rem := int64(n & ((1 << (b + 1)) - 1))
			if rem > 1<<b {
				setCount += rem - 1<<b
			}
			cleared := int64(n) - setCount
			total += int64(1) << b * (int64(n)*int64(n) - cleared*cleared)
		}
		return total <= s/m
	}
	hi := 1
	for fits(hi) {
		hi *= 2
	}
	lo := 1
	for lo < hi {
		mid := (lo + hi) / 2
		if fits(mid) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo - 1
}
