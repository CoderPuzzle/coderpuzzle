// Per part, an index may serve at most one swap, one replace and one
// reversal, so an optimal schedule permutes first (at most one reversal
// plus disjoint swaps) and replaces what is left. A swap pays off exactly
// on a mutual pair (a,b)/(b,a); with type counts cnt[a][b] = #{p: s[p]=a
// != t[p]=b}, the largest swap matching is sum min(cnt[a][b], cnt[b][a]),
// and the part costs wrong - pairs, or 1 + wrong' - pairs' when reversed
// first.
func minOperations(word1 string, word2 string) int {
	n := len(word1)
	swapPairs := func(cnt [26][26]int) int {
		total := 0
		for a := 0; a < 26; a++ {
			for b := a + 1; b < 26; b++ {
				if cnt[a][b] < cnt[b][a] {
					total += cnt[a][b]
				} else {
					total += cnt[b][a]
				}
			}
		}
		return total
	}
	cost := make([][]int, n)
	for i := range cost {
		cost[i] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		for j := i; j < n; j++ {
			var cnt [26][26]int
			var cntRev [26][26]int
			wrong, wrongRev := 0, 0
			for p := i; p <= j; p++ {
				a, b := int(word1[p]-'a'), int(word2[p]-'a')
				if a != b {
					wrong++
					cnt[a][b]++
				}
				aRev := int(word1[j-(p-i)] - 'a')
				if aRev != b {
					wrongRev++
					cntRev[aRev][b]++
				}
			}
			direct := wrong - swapPairs(cnt)
			reversed := 1 + wrongRev - swapPairs(cntRev)
			if reversed < direct {
				direct = reversed
			}
			cost[i][j] = direct
		}
	}
	// Partition DP over prefix lengths; costs add across parts.
	const inf = 1 << 30
	best := make([]int, n+1)
	best[0] = 0
	for end := 1; end <= n; end++ {
		best[end] = inf
		for start := 0; start < end; start++ {
			if candidate := best[start] + cost[start][end-1]; candidate < best[end] {
				best[end] = candidate
			}
		}
	}
	return best[n]
}
