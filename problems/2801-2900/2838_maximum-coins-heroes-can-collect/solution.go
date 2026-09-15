import "sort"

func maximumCoins(heroes []int, monsters []int, coins []int) []int64 {
	// A hero that beats one monster beats every monster of smaller-or-equal
	// power too, so sorting (power, coin) pairs makes each answer a prefix
	// sum over that order: binary-search how many monsters sit at or below
	// the hero's power and read prefix[k]. Totals reach 10^5 * 10^9 = 10^11,
	// past int range on 32-bit builds, so sums accumulate in int64.
	m := len(monsters)
	order := make([]int, m)
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return monsters[order[a]] < monsters[order[b]] })
	prefix := make([]int64, m+1)
	for i, idx := range order {
		prefix[i+1] = prefix[i] + int64(coins[idx])
	}
	ans := make([]int64, len(heroes))
	for i, hero := range heroes {
		lo, hi := 0, m
		for lo < hi {
			mid := int(uint(lo+hi) >> 1)
			if monsters[order[mid]] <= hero {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		ans[i] = prefix[lo]
	}
	return ans
}
