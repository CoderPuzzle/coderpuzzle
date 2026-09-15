func minimumCost(cost1 int, cost2 int, costBoth int, need1 int, need2 int) int64 {
	// Price each unit independently. A unit counted toward BOTH
	// requirements comes as one type 3 item or as one item of each
	// type, whichever is cheaper; a leftover unit of a single
	// requirement comes as that type's own item or as a type 3 item
	// whose spare contribution is wasted, whichever is cheaper. Units
	// never interact, so the per-unit minima sum to the global minimum.
	// Needs reach 1e9 against costs of 1e6, so totals pass 2e15 and the
	// 32-bit range -- every product accumulates in an int64.
	pairs := int64(min(need1, need2))
	pairCost := min(int64(costBoth), int64(cost1)+int64(cost2))
	rest1 := min(int64(costBoth), int64(cost1))
	rest2 := min(int64(costBoth), int64(cost2))
	return pairs*pairCost + (int64(need1)-pairs)*rest1 + (int64(need2)-pairs)*rest2
}
