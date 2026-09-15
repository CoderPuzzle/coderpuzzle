import "math/bits"

func canMakePaliQueries(s string, queries [][]int) []bool {
	n := len(s)
	// prefix[i] = bitmask of parities of letter counts in s[:i]
	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] ^ (1 << (s[i] - 'a'))
	}
	answer := make([]bool, 0, len(queries))
	for _, query := range queries {
		left, right, k := query[0], query[1], query[2]
		mask := prefix[right+1] ^ prefix[left]
		odd := bits.OnesCount(uint(mask))
		answer = append(answer, odd/2 <= k)
	}
	return answer
}
