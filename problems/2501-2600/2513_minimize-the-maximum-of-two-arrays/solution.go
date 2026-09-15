// Binary search the smallest feasible maximum m: m - m/d1 numbers arr1 can
// take, m - m/d2 for arr2, and m - m/lcm blocked by neither; 64-bit math
// since the lcm can reach 10^10.
func minimizeSet(divisor1 int, divisor2 int, uniqueCnt1 int, uniqueCnt2 int) int {
	gcd := func(a, b int64) int64 {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	total := int64(uniqueCnt1) + int64(uniqueCnt2)
	shared := int64(divisor1) / gcd(int64(divisor1), int64(divisor2)) * int64(divisor2)
	feasible := func(m int64) bool {
		return m-m/int64(divisor1) >= int64(uniqueCnt1) &&
			m-m/int64(divisor2) >= int64(uniqueCnt2) &&
			m-m/shared >= total
	}
	lo, hi := int64(1), 2*total
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo)
}
