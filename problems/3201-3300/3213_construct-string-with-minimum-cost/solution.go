// Reverse DP over suffixes: dp[i] is the minimum cost to assemble
// target[i:], dp[n] is 0, and each position extends every word that
// matches its next characters. Duplicate words collapse to their
// cheapest cost first; per position only DISTINCT word lengths matter,
// and their count never exceeds sqrt(2 * total word characters).
// Walking candidate lengths ascending lets one wrapping uint64
// polynomial hash of target[i:i+length) extend in O(1) per step; a hash
// hit only triggers an exact map probe, so correctness never rests on
// the hash — a collision merely wastes one probe. Costs accumulate in
// int64 room (the answer itself fits an int).
func minimumCost(target string, words []string, costs []int) int {
	best := make(map[string]int64, len(words))
	for k, word := range words {
		c := int64(costs[k])
		if prev, ok := best[word]; !ok || c < prev {
			best[word] = c
		}
	}
	n := len(target)
	buckets := make(map[int]map[uint64]struct{})
	maxLen := 0
	for word := range best {
		h := uint64(0)
		for k := 0; k < len(word); k++ {
			h = h*131 + uint64(word[k])
		}
		bucket, ok := buckets[len(word)]
		if !ok {
			bucket = make(map[uint64]struct{})
			buckets[len(word)] = bucket
		}
		bucket[h] = struct{}{}
		if len(word) > maxLen {
			maxLen = len(word)
		}
	}
	const big = int64(1) << 62
	dp := make([]int64, n+1)
	for k := range dp {
		dp[k] = big
	}
	dp[n] = 0
	for i := n - 1; i >= 0; i-- {
		cur := big
		h := uint64(0)
		limit := maxLen
		if n-i < limit {
			limit = n - i
		}
		for length := 1; length <= limit; length++ {
			h = h*131 + uint64(target[i+length-1])
			if bucket, ok := buckets[length]; ok {
				if _, hit := bucket[h]; hit {
					if c, ok := best[target[i:i+length]]; ok {
						if nxt := dp[i+length]; nxt != big && nxt+c < cur {
							cur = nxt + c
						}
					}
				}
			}
		}
		dp[i] = cur
	}
	if dp[0] >= big {
		return -1
	}
	return int(dp[0])
}
