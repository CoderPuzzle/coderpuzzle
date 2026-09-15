import "sort"

// Count occurrences of each value, then enumerate value pairs (a, b)
// with a <= b; the required third value c = target - a - b is accepted
// only when c >= b, so each unordered value multiset {a, b, c} is
// priced exactly once. The index count is C(ca, 3) when a == b == c,
// C(ca, 2) * cc or ca * C(cb, 2) when exactly two coincide, and
// ca * cb * cc when all three differ — each term reduced mod 10^9 + 7
// as it is added, since C(3000, 3) is far past 32 bits before the
// modulus ever fires.
func threeSumMulti(arr []int, target int) int {
	const mod = 1_000_000_007
	counts := make(map[int]int)
	for _, value := range arr {
		counts[value]++
	}
	values := make([]int, 0, len(counts))
	for value := range counts {
		values = append(values, value)
	}
	sort.Ints(values)
	d := len(values)
	total := int64(0)
	for i, a := range values {
		for j := i; j < d; j++ {
			b := values[j]
			c := target - a - b
			if c < b {
				break
			}
			cc, ok := counts[c]
			if !ok {
				continue
			}
			ca, cb := counts[a], counts[b]
			var term int64
			switch {
			case a == b && b == c:
				term = int64(ca) * int64(ca-1) * int64(ca-2) / 6
			case a == b:
				term = int64(ca) * int64(ca-1) / 2 * int64(cc)
			case b == c:
				term = int64(ca) * int64(cb) * int64(cb-1) / 2
			default:
				term = int64(ca) * int64(cb) * int64(cc)
			}
			total = (total + term) % mod
		}
	}
	return int(total)
}
