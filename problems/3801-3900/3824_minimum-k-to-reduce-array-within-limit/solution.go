// An element v needs ceil(v / k) reduce-by-k operations, so
// nonPositive(nums, k) is the sum of those ceilings. Feasibility is
// monotone in k: every ceiling only shrinks as k grows while k * k
// strictly grows, so binary search finds the smallest feasible k.
// Totals reach 1e5 * 1e5 = 1e10 and squares of k reach 1e10 as well,
// beyond int32 — Go's int is 64-bit on the pinned toolchain, so the
// plain loop carries them.
func minimumK(nums []int) int {
	feasible := func(k int) bool {
		total := 0
		for _, value := range nums {
			total += (value + k - 1) / k
		}
		return total <= k*k
	}
	// Warm-up: once k >= max(nums) every ceiling is exactly 1, so
	// nonPositive(nums, k) == n there; doubling max(nums) until feasible
	// stops at the first power-of-two multiple with k*k >= n.
	hi := 0
	for _, value := range nums {
		if value > hi {
			hi = value
		}
	}
	for !feasible(hi) {
		hi *= 2
	}
	lo := 1
	for lo < hi {
		mid := (lo + hi) / 2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
