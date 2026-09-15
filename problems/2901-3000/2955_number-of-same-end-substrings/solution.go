func sameEndSubstringCount(s string, queries [][]int) []int {
	// cnt[c][j] = occurrences of letter c in s[:j]. A query answer is the
	// sum over letters of t*(t+1)/2 for the range frequency t: every
	// position pairs with itself, and each equal pair of positions is one
	// same-end substring. Max answer 450015000 fits in 32 bits.
	n := len(s)
	cnt := make([][]int, 26)
	for c := range cnt {
		cnt[c] = make([]int, n+1)
	}
	for j := 1; j <= n; j++ {
		for c := 0; c < 26; c++ {
			cnt[c][j] = cnt[c][j-1]
		}
		cnt[s[j-1]-'a'][j]++
	}
	ans := make([]int, len(queries))
	for k, q := range queries {
		l, r := q[0], q[1]
		total := 0
		for c := 0; c < 26; c++ {
			t := cnt[c][r+1] - cnt[c][l]
			total += t * (t + 1) / 2
		}
		ans[k] = total
	}
	return ans
}
