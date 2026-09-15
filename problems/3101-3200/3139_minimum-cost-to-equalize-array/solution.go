// Pairing two indices in one op is only attractive while cost2 < 2*cost1;
// beyond that every deficit is paid through single ops straight to the
// maximum. Otherwise each shared target F carries total deficit T with
// largest single demand F - min(nums); at most min(T/2, T-peak) pair ops
// schedule, and scanning F up to twice the maximum suffices because any
// further step adds n * cost2 over a two-step span.
func minCostToEqualizeArray(nums []int, cost1 int, cost2 int) int {
	const mod = 1000000007
	low, high := nums[0], nums[0]
	for _, v := range nums {
		if v < low {
			low = v
		}
		if v > high {
			high = v
		}
	}
	var total int64
	for _, v := range nums {
		total += int64(high - v)
	}
	price1, price2 := int64(cost1), int64(cost2)
	if 2*price1 <= price2 {
		return int(total * price1 % mod)
	}
	count := int64(len(nums))
	best := int64(-1)
	for target := int64(high); target <= 2*int64(high); target++ {
		peak := target - int64(low)
		pair, rest := int64(0), int64(0)
		if 2*peak <= total {
			pair, rest = total/2, total%2
		} else {
			pair, rest = total-peak, 2*peak-total
		}
		cost := pair*price2 + rest*price1
		if best < 0 || cost < best {
			best = cost
		}
		total += count
	}
	return int(best % mod)
}
