// A square plot with half-side k covers the integer coordinates [-k,k]^2.
// Summing |i| + |j| over that box gives apples(k) = 2k(k+1)(2k+1); the answer
// is 8k for the smallest k with apples(k) >= neededApples. neededApples <= 1e15
// implies k <= 63000, keeping every intermediate within int64.
func minimumPerimeter(neededApples int64) int {
	apples := func(k int64) int64 { return 2 * k * (k + 1) * (2*k + 1) }
	lo, hi := int64(1), int64(1)
	for apples(hi) < neededApples {
		hi *= 2
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if apples(mid) >= neededApples {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return int(8 * lo)
}
