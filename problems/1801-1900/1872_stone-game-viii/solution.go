func stoneGameVIII(stones []int) int64 {
	// The row is always [prefix[j], stones[j], ...]; a move from frontier
	// j nets exactly prefix[k] for the chosen k>j, so
	// f(j) = max_{k>j}(prefix[k] - f(k)). One running maximum S folds
	// candidate k=j via S <- max(S, prefix[j-1] - S).
	run := int64(0)
	for _, v := range stones {
		run += int64(v)
	}
	best := run
	for j := len(stones) - 1; j >= 2; j-- {
		run -= int64(stones[j])
		if d := run - best; d > best {
			best = d
		}
	}
	return best
}
