import "math/bits"

func canDistribute(nums []int, quantity []int) bool {
	// A customer's integers must all be equal, so each customer draws
	// from a single value — and a value with count c serves any group
	// of customers whose quantities sum to at most c, with several
	// customers free to share one value. Only the counts matter, m is
	// at most 10, and there are at most 50 distinct values, so a
	// subset DP over customer bitmasks, one frequency value at a
	// time, covers every distribution.
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	m := len(quantity)
	full := 1<<m - 1
	// subsetSums[mask] = total amount ordered by the customers in mask.
	subsetSums := make([]int, 1<<m)
	for mask := 1; mask <= full; mask++ {
		low := mask & -mask
		subsetSums[mask] = subsetSums[mask^low] + quantity[bits.TrailingZeros(uint(low))]
	}
	// reachable[mask]: the customers in mask are served by the values
	// processed so far. Each value either stays unused (the previous
	// layer carries over) or takes one submask of the still-unsatisfied
	// customers whose quantity sum fits within its count.
	reachable := make([]bool, 1<<m)
	reachable[0] = true
	for _, count := range counts {
		next := make([]bool, 1<<m)
		copy(next, reachable)
		for mask := 0; mask <= full; mask++ {
			if !reachable[mask] {
				continue
			}
			available := full ^ mask
			for submask := available; submask != 0; submask = (submask - 1) & available {
				if subsetSums[submask] <= count {
					next[mask|submask] = true
				}
			}
		}
		reachable = next
	}
	return reachable[full]
}
