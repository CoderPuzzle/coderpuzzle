import "strconv"

func smallestGoodBase(n string) string {
	value, _ := strconv.ParseInt(n, 10, 64)
	// An all-ones representation is a geometric sum 1 + k + ... + k^m.
	// Scan lengths longest-first: at a fixed total, more terms force
	// every term - the base included - to be smaller, so the first
	// length that admits an integer base already carries the smallest
	// one.
	for m := 60; m > 1; m-- {
		if base := baseForLength(value, m); base != 0 {
			return strconv.FormatInt(base, 10)
		}
	}
	// No representation of three 1s or longer fits; "11" in base
	// value - 1 always does.
	return strconv.FormatInt(value-1, 10)
}

// 1 + k + ... + k^m rises strictly with k, so grow a power-of-two bound
// past the target, then bisect down to the smallest base whose sum
// reaches value; that base is the hit when the sum equals value exactly.
func baseForLength(value int64, m int) int64 {
	hi := int64(2)
	for sumCapped(hi, m, value) <= value {
		hi *= 2
	}
	lo := int64(2)
	for lo < hi {
		mid := (lo + hi) / 2
		if sumCapped(mid, m, value) < value {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	if sumCapped(lo, m, value) == value {
		return lo
	}
	return 0
}

// The geometric sum, capped at "already past value": comparing the term
// against value / k before multiplying is the overflow guard - no stored
// number ever exceeds 2 * value <= 2 * 10^18, which fits the 64-bit
// integers the fixed-width languages carry.
func sumCapped(k int64, m int, value int64) int64 {
	total := int64(1)
	term := int64(1)
	for i := 0; i < m; i++ {
		if term > value/k {
			return value + 1
		}
		term *= k
		total += term
		if total > value {
			return value + 1
		}
	}
	return total
}
