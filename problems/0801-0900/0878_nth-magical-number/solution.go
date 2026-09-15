// Divisible by a or b, so inclusion-exclusion counts the magical numbers
// up to x as x/a + x/b - x/lcm(a, b) — the overlap holds exactly the
// multiples of the least common multiple. That count never decreases and
// rises by one exactly on magical numbers, so the nth magical number is
// the smallest x whose count reaches n. Binary search over
// [1, n*min(a, b)] finds it — the top is the nth multiple of the smaller
// value, itself magical, so it is a valid ceiling. Go's int is 64-bit,
// wide enough for an answer reaching 4e13 at the bound.
func nthMagicalNumber(n int, a int, b int) int {
	g, y := a, b
	for y != 0 {
		g, y = y, g%y
	}
	lcm := a / g * b
	lo, hi := int64(1), int64(n)*int64(min(a, b))
	for lo < hi {
		mid := lo + (hi-lo)/2
		if mid/int64(a)+mid/int64(b)-mid/int64(lcm) >= int64(n) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(lo % 1000000007)
}
