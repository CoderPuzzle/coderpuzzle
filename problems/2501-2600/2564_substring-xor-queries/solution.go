// first ^ second <= 2^30 - 1 (both fit under 10^9), so only substrings of
// at most 30 characters can ever match a query. Sweeping lengths ascending
// records each decoded value the first time it is seen, which is exactly
// the statement's pick: shortest length, ties broken by the leftmost start.
// A 30-bit window stays < 2^30, safely inside int.
func substringXorQueries(s string, queries [][]int) [][]int {
	best := make(map[int][2]int)
	n := len(s)
	for length := 1; length <= 30 && length <= n; length++ {
		for left := 0; left+length <= n; left++ {
			if s[left] == '0' && length > 1 {
				// "0xxx" decodes to xxx's value, which the previous,
				// shorter pass already handled.
				continue
			}
			val := 0
			for k := left; k < left+length; k++ {
				val = val*2 + int(s[k]-'0')
			}
			if _, seen := best[val]; !seen {
				best[val] = [2]int{left, left + length - 1}
			}
		}
	}
	answer := make([][]int, len(queries))
	for i, q := range queries {
		target := q[0] ^ q[1]
		if pair, ok := best[target]; ok {
			answer[i] = []int{pair[0], pair[1]}
		} else {
			answer[i] = []int{-1, -1}
		}
	}
	return answer
}
