// A stone counts when its letter is one of the jewel types. Those types
// are case sensitive and English letters occupy two disjoint ASCII bands,
// 65..90 and 97..122, so a direct 128-slot table keyed by character code
// marks each jewel letter in place — 'a' and 'A' land in different slots
// with no folding — and every stone then costs one array lookup.
func numJewelsInStones(jewels string, stones string) int {
	var isJewel [128]bool
	for i := 0; i < len(jewels); i++ {
		isJewel[jewels[i]] = true
	}
	count := 0
	for i := 0; i < len(stones); i++ {
		if isJewel[stones[i]] {
			count++
		}
	}
	return count
}
