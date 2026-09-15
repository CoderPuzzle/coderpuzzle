// A product of nonzero digits only ever carries the primes 2, 3, 5 and 7,
// so any other prime factor in t makes the request impossible.
func smallestNumber(num string, t int64) string {
	primes := [4]int64{2, 3, 5, 7}
	var need [4]int
	for idx, prime := range primes {
		for t%prime == 0 {
			t /= prime
			need[idx]++
		}
	}
	if t != 1 {
		return "-1"
	}
	// Per-digit exponent vectors over the primes (2, 3, 5, 7).
	var vec [10][4]int
	for d := 2; d <= 9; d++ {
		for idx, prime := range primes {
			for rest := d; rest%int(prime) == 0; rest /= int(prime) {
				vec[d][idx]++
			}
		}
	}
	n := len(num)
	// A kept 0 would poison the product, so nothing at or past the first
	// zero can be retained; the prefix sums cover the zero-free head.
	firstZero := n
	for i := 0; i < n; i++ {
		if num[i] == '0' {
			firstZero = i
			break
		}
	}
	prefix := make([][4]int, firstZero+1)
	for i := 0; i < firstZero; i++ {
		for k := 0; k < 4; k++ {
			prefix[i+1][k] = prefix[i][k] + vec[num[i]-'0'][k]
		}
	}
	if firstZero == n {
		covered := true
		for k := 0; k < 4; k++ {
			if prefix[n][k] < need[k] {
				covered = false
				break
			}
		}
		if covered {
			return num
		}
	}
	// Keep the longest possible prefix and raise exactly one digit: a longer
	// kept prefix always wins, then a smaller raised digit, then a minimal
	// suffix. The shortfall shrinks as the split moves left while the free
	// suffix grows, so the first workable split is the answer, and only a
	// handful of splits near the end can fail.
	for i := min(n-1, firstZero); i >= 0; i-- {
		free := n - 1 - i
		for d := int(num[i]-'0') + 1; d <= 9; d++ {
			var r [4]int
			for k := 0; k < 4; k++ {
				r[k] = max(0, need[k]-prefix[i][k]-vec[d][k])
			}
			if minDigits(r) <= free {
				return num[:i] + string(rune('0'+d)) + build(free, r, &vec)
			}
		}
	}
	// No same-length number works: the smallest longer zero-free number is
	// leading 1s with just enough covering digits at the very end.
	return build(max(n+1, minDigits(need)), need, &vec)
}

// Fewest digits whose product covers r: a 5 or a 7 in r always burns a
// dedicated digit; among twos and threes, eights carry three twos, nines two
// threes, and a six trades one of each, and that trade only pays for the
// first couple of leftovers, so a short scan finds the minimum.
func minDigits(r [4]int) int {
	best := r[2] + r[3] + (r[0]+2)/3 + (r[1]+1)/2
	for z := 1; z <= min(min(r[0], r[1]), 5); z++ {
		best = min(best, r[2]+r[3]+z+(r[0]-z+2)/3+(r[1]-z+1)/2)
	}
	return best
}

// Lexicographically smallest zero-free string of exactly this length covering
// r: place the smallest digit that leaves a remainder the positions still
// open can cover.
func build(length int, r [4]int, vec *[10][4]int) string {
	out := make([]byte, 0, length)
	for pos := 0; pos < length; pos++ {
		for d := 1; d <= 9; d++ {
			var nxt [4]int
			for k := 0; k < 4; k++ {
				nxt[k] = max(0, r[k]-vec[d][k])
			}
			if minDigits(nxt) <= length-pos-1 {
				out = append(out, byte('0'+d))
				r = nxt
				break
			}
		}
	}
	return string(out)
}
