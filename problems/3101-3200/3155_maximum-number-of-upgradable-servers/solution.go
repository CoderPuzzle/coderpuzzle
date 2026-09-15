// For one data center, upgrading u servers is feasible exactly when
// selling some of the remaining servers can bridge the shortfall: u *
// upgrade may exceed money only if ceil(shortfall / sell) extra servers
// sold still leave u un-upgraded hosts. Feasibility never flips back as
// u grows, so a binary search on u finds the maximum. Products reach
// 10^5 * 10^5 = 10^10, past int32 range: compute in an int64.
func maxUpgrades(count []int, upgrade []int, sell []int, money []int) []int {
	answer := make([]int, len(count))
	for i := 0; i < len(count); i++ {
		lo, hi := 0, count[i]
		for lo < hi {
			mid := lo + (hi-lo+1)/2
			spent := int64(mid) * int64(upgrade[i])
			feasible := false
			if spent <= int64(money[i]) {
				feasible = true
			} else {
				shortfall := spent - int64(money[i])
				toSell := (shortfall + int64(sell[i]) - 1) / int64(sell[i])
				feasible = toSell+int64(mid) <= int64(count[i])
			}
			if feasible {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		answer[i] = lo
	}
	return answer
}
