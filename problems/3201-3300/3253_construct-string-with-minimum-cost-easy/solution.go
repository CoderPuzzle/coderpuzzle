import "strings"

// Forward DP over prefixes: dp[i] is the minimum cost to assemble
// target[:i], dp[0] is 0, and every reachable position extends each
// DISTINCT word matching its next characters. Duplicate words first
// collapse to their cheapest occurrence. The Easy bounds are small —
// at most 50 words against a target of at most 2000 characters — so
// a direct scan of all words at all positions suffices; greedy
// longest-match fails (a pricey long word can block cheaper short
// ones), and an unreachable dp[n] is the -1 case. The i+len(word) <= n
// bound rejects words longer than the remaining suffix; HasPrefix never
// reads past either string. Costs accumulate in int64 room even though
// any achievable cost is at most len(target) * max(cost) = 2 * 10^8,
// which fits an int.
func minimumCost(target string, words []string, costs []int) int {
	best := make(map[string]int64, len(words))
	for k, word := range words {
		c := int64(costs[k])
		if prev, ok := best[word]; !ok || c < prev {
			best[word] = c
		}
	}
	n := len(target)
	const big = int64(1) << 62
	dp := make([]int64, n+1)
	for k := range dp {
		dp[k] = big
	}
	dp[0] = 0
	for i := 0; i < n; i++ {
		if dp[i] == big {
			continue
		}
		for word, c := range best {
			j := i + len(word)
			if j > n || dp[i]+c >= dp[j] {
				continue
			}
			if strings.HasPrefix(target[i:], word) {
				dp[j] = dp[i] + c
			}
		}
	}
	if dp[n] >= big {
		return -1
	}
	return int(dp[n])
}
