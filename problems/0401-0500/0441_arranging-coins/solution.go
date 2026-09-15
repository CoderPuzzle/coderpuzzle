// The answer is the largest k whose triangular total T(k) = k*(k+1)/2 fits
// inside n (rows 1..k cost 1+2+...+k coins, and the leftover coins cannot
// finish row k+1). T is strictly increasing, so the predicate T(mid) <= n is
// monotone: binary search the boundary, and hi ends on the largest row count
// that fits. int is 64-bit here, so mid*(mid+1) never overflows even at the
// domain ceiling.
func arrangeCoins(n int) int {
	lo, hi := 1, n
	for lo <= hi {
		mid := (lo + hi) / 2
		if mid*(mid+1)/2 <= n {
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	return hi
}
