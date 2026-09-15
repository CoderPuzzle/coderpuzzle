import "math/bits"

func maximumANDSum(nums []int, numSlots int) int {
	// Model each slot as two individual positions: position p belongs to
	// slot p/2 + 1. numSlots <= 9 gives at most 18 positions, so 2^18
	// states exhaustively cover every assignment.
	positions := 2 * numSlots
	size := 1 << positions
	dp := make([]int, size)
	for i := range dp {
		dp[i] = -1
	}
	dp[0] = 0
	best := 0
	for mask := 0; mask < size; mask++ {
		// -1 marks unreachable masks.
		if dp[mask] < 0 {
			continue
		}
		// popcount says how many numbers are placed, so the next number is
		// determined by the state — a fixed placement order is exact because
		// the sum is symmetric in the assignment.
		i := bits.OnesCount(uint(mask))
		if i == len(nums) {
			if dp[mask] > best {
				best = dp[mask]
			}
			continue
		}
		for p := 0; p < positions; p++ {
			if mask&(1<<p) != 0 {
				continue
			}
			nxt := dp[mask] + (nums[i] & (p/2 + 1))
			slotMask := mask | (1 << p)
			if nxt > dp[slotMask] {
				dp[slotMask] = nxt
			}
		}
	}
	return best
}
