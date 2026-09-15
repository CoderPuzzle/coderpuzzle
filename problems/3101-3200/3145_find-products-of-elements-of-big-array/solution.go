func findProductsOfElements(queries [][]int64) []int {
	result := make([]int, 0, len(queries))
	for _, q := range queries {
		exp := exponentSum(q[1]+1) - exponentSum(q[0])
		result = append(result, int(powmod(2, exp, q[2])))
	}
	return result
}

// countBit: count of integers in [1, M] with bit b set
func countBit(M int64, b int) int64 {
	if M <= 0 {
		return 0
	}
	cycle := int64(1) << uint(b+1)
	half := int64(1) << uint(b)
	full := (M + 1) / cycle
	rem := (M + 1) % cycle
	extra := rem - half
	if extra < 0 {
		extra = 0
	}
	return full*half + extra
}

func popcountPrefix(M int64) int64 {
	var total int64
	b := 0
	for int64(1)<<uint(b) <= M {
		total += countBit(M, b)
		b++
	}
	return total
}

func bitsumPrefix(M int64) int64 {
	var total int64
	b := 0
	for int64(1)<<uint(b) <= M {
		total += int64(b) * countBit(M, b)
		b++
	}
	return total
}

// exponentSum: sum of exponents of the first n elements of big_nums (n >= 0)
func exponentSum(n int64) int64 {
	if n <= 0 {
		return 0
	}
	lo, hi := int64(0), n
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if popcountPrefix(mid) <= n {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	m := lo
	total := bitsumPrefix(m)
	rem := n - popcountPrefix(m)
	if rem > 0 {
		x := m + 1
		b := 0
		for rem > 0 {
			if (x>>uint(b))&1 == 1 {
				total += int64(b)
				rem--
			}
			b++
		}
	}
	return total
}

func powmod(base, exp, mod int64) int64 {
	base %= mod
	acc := 1 % mod
	for exp > 0 {
		if exp&1 == 1 {
			acc = acc * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return acc
}
