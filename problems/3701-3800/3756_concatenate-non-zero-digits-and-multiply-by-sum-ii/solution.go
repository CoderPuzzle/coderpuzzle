// Prefix arrays over the NON-ZERO digits: prefVal keeps the value mod M of
// concatenating them, prefSum their digit sum, prefCnt their count. The
// compressed substring s[l..r] is the slice of the non-zero sequence between
// indexes cnt[l] and cnt[r+1]; its value is recoverable from the two prefix
// values with one pow10 shift, and its digit sum is a plain prefix difference
// (zeros add 0 to both). All products stay below (1e9+7)^2 ~ 1e18, inside
// int64.
func sumAndMultiply(s string, queries [][]int) []int {
	const mod = 1000000007
	n := len(s)
	prefVal := make([]int64, n+1)
	prefSum := make([]int64, n+1)
	prefCnt := make([]int, n+1)
	pow10 := make([]int64, n+1)
	pow10[0] = 1
	for i := 0; i < n; i++ {
		d := int64(s[i] - '0')
		prefVal[i+1] = prefVal[i]
		prefSum[i+1] = prefSum[i] + d
		prefCnt[i+1] = prefCnt[i]
		pow10[i+1] = pow10[i] * 10 % mod
		if s[i] != '0' {
			prefVal[i+1] = (prefVal[i]*10 + d) % mod
			prefCnt[i+1]++
		}
	}
	answer := make([]int, len(queries))
	for qi, query := range queries {
		l, r := query[0], query[1]
		k := prefCnt[r+1] - prefCnt[l]
		// x = the concatenation of the k non-zero digits in s[l..r];
		// prefVal[r+1] = prefVal[l] * 10^k + x, so solve for x.
		x := (prefVal[r+1] - prefVal[l]*pow10[k]) % mod
		if x < 0 {
			x += mod
		}
		digitSum := prefSum[r+1] - prefSum[l]
		answer[qi] = int((x * digitSum) % mod)
	}
	return answer
}
