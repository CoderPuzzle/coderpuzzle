// Coprimality of the two products is decided by shared prime factors,
// never by the products themselves: with n up to 10^4 and values up to
// 10^6, both sides reach thousands of digits. Boundary i works exactly
// when no prime's occurrence span [first, last] straddles it. A
// smallest-prime-factor sieve factorizes each element in O(log value);
// a difference array blocks the straddled boundaries; the first open
// boundary in [0, n - 2] wins.
func findValidSplit(nums []int) int {
	top := 0
	for _, value := range nums {
		if value > top {
			top = value
		}
	}
	spf := make([]int32, top+1)
	for i := range spf {
		spf[i] = int32(i)
	}
	for d := int32(2); int64(d)*int64(d) <= int64(top); d++ {
		if spf[d] == d {
			for multiple := d * d; multiple <= int32(top); multiple += d {
				if spf[multiple] == multiple {
					spf[multiple] = d
				}
			}
		}
	}
	first := map[int]int{}
	last := map[int]int{}
	for index, value := range nums {
		for value > 1 {
			prime := int(spf[value])
			if _, seen := first[prime]; !seen {
				first[prime] = index
			}
			last[prime] = index
			for value%prime == 0 {
				value /= prime
			}
		}
	}
	n := len(nums)
	blocked := make([]int, n+1)
	for prime, lo := range first {
		hi := last[prime] - 1
		if hi > n-2 {
			hi = n - 2
		}
		if lo <= hi {
			blocked[lo]++
			blocked[hi+1]--
		}
	}
	running := 0
	for i := 0; i < n-1; i++ {
		running += blocked[i]
		if running == 0 {
			return i
		}
	}
	return -1
}
