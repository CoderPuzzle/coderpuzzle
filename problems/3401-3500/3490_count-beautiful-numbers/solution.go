import "fmt"

func beautifulNumbers(l int, r int) int {
	// Beautiful in [l, r] = count up to r minus count up to l - 1.
	return int(countUpTo(int64(r)) - countUpTo(int64(l)-1))
}

func countUpTo(x int64) int64 {
	if x <= 0 {
		return 0
	}
	s := []byte(fmt.Sprintf("%d", x))
	digits := make([]int, len(s))
	for i, c := range s {
		digits[i] = int(c - '0')
	}
	memo := make(map[uint64]int64)
	// Fresh memo per bound: tight transitions depend on x's digits.
	return dp(digits, memo, 0, true, false, 0, 1)
}

// State: position, tight (prefix equals x's), started (nonzero seen),
// running digit sum and digit product — all that beauty depends on.
func dp(digits []int, memo map[uint64]int64, pos int, tight bool, started bool, ssum int64, prod int64) int64 {
	if pos == len(digits) {
		// Beautiful iff a number was built and prod is a multiple of the sum;
		// a 0 digit zeroes prod, and 0 is divisible by any positive sum.
		if started && ssum > 0 && prod%ssum == 0 {
			return 1
		}
		return 0
	}
	key := packKey(pos, tight, started, ssum, prod)
	if v, ok := memo[key]; ok {
		return v
	}
	// A tight prefix is capped at x's digit; free prefixes may take any digit.
	limit := 9
	if tight {
		limit = digits[pos]
	}
	var res int64
	for d := 0; d <= limit; d++ {
		nt := tight && d == limit
		// Leading zeros contaminate neither the sum nor the product.
		if !started && d == 0 {
			res += dp(digits, memo, pos+1, nt, false, 0, 1)
		} else {
			res += dp(digits, memo, pos+1, nt, true, ssum+int64(d), prod*int64(d))
		}
	}
	memo[key] = res
	return res
}

func packKey(pos int, tight bool, started bool, ssum int64, prod int64) uint64 {
	// pos <= 9 (4 bits), tight (1), started (1), ssum <= 90 (7 bits), prod <= 9^10 < 2^32
	head := uint64((((int64(pos)*2+b2i(tight))*2+b2i(started))*128 + ssum))
	return head*(uint64(1)<<32) + uint64(prod)
}

func b2i(b bool) int64 {
	if b {
		return 1
	}
	return 0
}
