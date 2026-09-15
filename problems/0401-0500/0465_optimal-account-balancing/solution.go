import "math/bits"

func minTransfers(transactions [][]int) int {
	balance := make(map[int]int)
	for _, t := range transactions {
		balance[t[0]] -= t[2]
		balance[t[1]] += t[2]
	}
	debts := make([]int, 0, len(balance))
	for _, v := range balance {
		if v != 0 {
			debts = append(debts, v)
		}
	}
	// Only nonzero net balances matter: any zero-sum group of s people
	// settles in s-1 transfers, so maximizing the group count g of a
	// partition minimizes the total n - g.
	n := len(debts)
	if n == 0 {
		return 0
	}

	total := 1 << n
	// Subset sums built incrementally via the lowest set bit; valid marks
	// zero-sum subsets, the candidate groups.
	sums := make([]int, total)
	valid := make([]bool, total)
	for mask := 1; mask < total; mask++ {
		lsb := mask & -mask
		bit := bits.TrailingZeros(uint(lsb))
		sums[mask] = sums[mask^lsb] + debts[bit]
		valid[mask] = sums[mask] == 0
	}

	// dp[mask] = most disjoint valid groups partitioning mask; NEG means
	// "not exactly partitionable", so only full covers add.
	const NEG = -1000000000
	dp := make([]int, total)
	for i := range dp {
		dp[i] = NEG
	}
	dp[0] = 0
	for mask := 1; mask < total; mask++ {
		sub := mask
		for sub != 0 {
			if valid[sub] && dp[mask^sub] != NEG {
				if dp[mask^sub]+1 > dp[mask] {
					dp[mask] = dp[mask^sub] + 1
				}
			}
			sub = (sub - 1) & mask
		}
	}
	// Fewest transactions = n balances minus the best group count.
	return n - dp[total-1]
}
