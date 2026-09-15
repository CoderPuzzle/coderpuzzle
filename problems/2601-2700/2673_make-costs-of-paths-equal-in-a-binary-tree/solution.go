// Walk heap indices from the deepest parent up to the root. At each node
// the two child subtrees must end on a common maximum, so their difference
// is charged once and the larger combined maximum travels up. Charges
// accumulate past 2^31, hence the int64 accumulator and return.
func minIncrements(n int, cost []int) int64 {
	subtree := make([]int64, n)
	for i, value := range cost {
		subtree[i] = int64(value)
	}
	var total int64
	for node := n / 2; node >= 1; node-- {
		left := subtree[2*node-1]
		right := subtree[2*node]
		if left >= right {
			total += left - right
			subtree[node-1] = left + int64(cost[node-1])
		} else {
			total += right - left
			subtree[node-1] = right + int64(cost[node-1])
		}
	}
	return total
}
