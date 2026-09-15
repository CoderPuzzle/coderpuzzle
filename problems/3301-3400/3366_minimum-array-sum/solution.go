func minArraySum(nums []int, k int, op1 int, op2 int) int {
	// dp[a][b] = smallest achievable sum of the remaining suffix given a
	// op1 uses and b op2 uses left. Each index branches over: skip, op1
	// alone, op2 alone, and both operations on the same index — in either
	// order, because halve-then-subtract and subtract-then-halve land on
	// different values (e.g. 5 with k = 3: 5 -> 3 -> 0 beats 5 -> 2 -> 1).
	// Values reach 1e5 and n is at most 100, so every sum stays far
	// inside 32-bit range.
	nxt := make([][]int, op1+1)
	for a := range nxt {
		nxt[a] = make([]int, op2+1)
	}
	for i := len(nums) - 1; i >= 0; i-- {
		value := nums[i]
		halved := (value + 1) / 2
		cur := make([][]int, op1+1)
		for a := range cur {
			cur[a] = make([]int, op2+1)
		}
		for a := 0; a <= op1; a++ {
			for b := 0; b <= op2; b++ {
				best := value + nxt[a][b]
				if a > 0 {
					if halved+nxt[a-1][b] < best {
						best = halved + nxt[a-1][b]
					}
					if b > 0 {
						// op2's precondition applies to the value it
						// meets, which depends on the order chosen.
						both := nxt[a-1][b-1]
						if halved >= k && halved-k+both < best {
							best = halved - k + both
						}
						if value >= k && (value-k+1)/2+both < best {
							best = (value-k+1)/2 + both
						}
					}
				}
				if b > 0 && value >= k && value-k+nxt[a][b-1] < best {
					best = value - k + nxt[a][b-1]
				}
				cur[a][b] = best
			}
		}
		nxt = cur
	}
	return nxt[op1][op2]
}
