func nthUglyNumber(n int, a int, b int, c int) int64 {
	ab, ac, bc := lcm(a, b), lcm(a, c), lcm(b, c)
	abc := lcm64(ab, int64(c))
	// count(x) is non-decreasing, so binary search the smallest x with
	// count(x) >= n — that x is itself ugly; hi is the answer ceiling
	lo, hi := int64(1), int64(2000000000)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if count1201(mid, int64(a), int64(b), int64(c), ab, ac, bc, abc) >= int64(n) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func count1201(x, a, b, c, ab, ac, bc, abc int64) int64 {
	// ugly numbers <= x via inclusion-exclusion: add each divisor's
	// multiples, subtract the pairwise lcms (counted twice), add
	// back the triple lcm
	return x/a + x/b + x/c - x/ab - x/ac - x/bc + x/abc
}

func gcd1201(x, y int64) int64 {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func lcm64(x, y int64) int64 {
	return x / gcd1201(x, y) * y
}

func lcm(x, y int) int64 {
	return lcm64(int64(x), int64(y))
}
