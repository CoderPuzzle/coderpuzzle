// Reachability sieve over the prices 0..primeOne*primeTwo: hint 1
// promises everything above that bound is buyable, so the answer hides
// somewhere inside. A price is buyable iff dropping one primeOne- or
// primeTwo-coin leaves a buyable price — walk the sieve upward and
// remember the largest price that never lights up. The product stays
// under 10^5, so the sieve is small and the answer fits comfortably in
// a 32-bit integer.
func mostExpensiveItem(primeOne int, primeTwo int) int {
	limit := primeOne * primeTwo
	reachable := make([]bool, limit+1)
	reachable[0] = true
	best := 0
	for price := 1; price <= limit; price++ {
		if (price >= primeOne && reachable[price-primeOne]) ||
			(price >= primeTwo && reachable[price-primeTwo]) {
			reachable[price] = true
		} else {
			best = price
		}
	}
	return best
}
