// A valid garden keeps two equally beautiful endpoints i < j and, since
// removal is free, every positive strictly between them: its sum is
// 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0) below k.
// seen[v] tracks the smallest P[i+1] over past occurrences of v (P only
// grows, so that is the first one). Totals stay under 1e5 * 1e4 + 2e4.
func maximumBeauty(flowers []int) int {
	seen := make(map[int]int)
	pos := 0
	answer := -(1 << 40)
	for _, v := range flowers {
		if best, ok := seen[v]; ok {
			if cand := 2*v + pos - best; cand > answer {
				answer = cand
			}
		}
		if v > 0 {
			pos += v
		}
		if best, ok := seen[v]; !ok || pos < best {
			seen[v] = pos
		}
	}
	return answer
}
