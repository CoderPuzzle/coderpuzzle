// Filling or emptying a jug moves the total a + b by ±x or ±y, and a
// pour leaves it alone, so every reachable total is a multiple of
// g = gcd(x, y) not exceeding x + y; by Bézout each of those multiples
// is reachable. Target 0 is the start state (true even for two empty
// jugs); the x > 0 guard keeps the modulo safe when both capacities
// are zero.
func canMeasureWater(x int, y int, target int) bool {
	if target > x+y {
		return false
	}
	if target == 0 {
		return true
	}
	for y != 0 {
		x, y = y, x%y
	}
	return x > 0 && target%x == 0
}
