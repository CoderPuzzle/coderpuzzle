// For a fixed left end the window gcd only ever decreases as the window
// grows, and every drop at least halves it, so each left end owns only
// O(log(max(nums))) distinct gcd values. Keeping one (gcd, furthest right
// end) entry per value turns the sweep into a merge of two short lists.
// Prefix sums reach 10^5 * 10^6 = 10^11 and the products reach past the
// 32-bit range, so the sums, gcds, and products all widen to int64.
func maxGcdSum(nums []int, k int) int64 {
	gcd := func(a, b int64) int64 {
		for b != 0 {
			a, b = b, a%b
		}
		return a
	}
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}
	var best int64
	var gs, rs []int64
	for lo := n - 1; lo >= 0; lo-- {
		ng := []int64{int64(nums[lo])}
		nr := []int64{int64(lo)}
		for t := 0; t < len(gs); t++ {
			merged := gcd(gs[t], int64(nums[lo]))
			if merged == ng[len(ng)-1] {
				nr[len(nr)-1] = rs[t]
			} else {
				ng = append(ng, merged)
				nr = append(nr, rs[t])
			}
		}
		gs, rs = ng, nr
		for t := 0; t < len(gs); t++ {
			if rs[t]-int64(lo)+1 >= int64(k) {
				// Positive elements: the longest window with this gcd
				// has the largest sum.
				candidate := gs[t] * (prefix[rs[t]+1] - prefix[lo])
				if candidate > best {
					best = candidate
				}
			}
		}
	}
	return best
}
