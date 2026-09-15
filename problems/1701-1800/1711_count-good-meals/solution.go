// A good meal needs two values summing to a power of two. Values are
// capped at 2^20, so a sum never exceeds 2^21: exactly the 22 powers
// 2^0 .. 2^21 are possible targets and nothing else. Counting how
// often each value occurs settles every pair at once. For a distinct
// value v and a power p, the mate w = p - v contributes
// count(v) * count(w) pairs when w > v, while w == v (p equal to 2v
// exactly) contributes count(v) choose 2: the pairs of equal-valued
// items at different indices. The raw total reaches n * (n - 1) / 2,
// past 32 bits, so it accumulates in an int64 and reduces mod 10^9 + 7
// at the end.
func countPairs(deliciousness []int) int {
	const mod = 1_000_000_007
	count := map[int]int{}
	for _, value := range deliciousness {
		count[value]++
	}
	total := int64(0)
	for value, c := range count {
		power := 1
		for shift := 0; shift < 22; shift++ {
			mate := power - value
			if mate > value {
				total += int64(c) * int64(count[mate])
			} else if mate == value {
				total += int64(c) * int64(c-1) / 2
			}
			power *= 2
		}
	}
	return int(total % mod)
}
