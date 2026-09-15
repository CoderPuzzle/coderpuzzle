func climbStairs(n int, costs []int) int64 {
	// prev1/prev2/prev3 are the cheapest ways to stand on the three steps
	// below the current one. Step 0 is free; the steps below it do not
	// exist, so their sentinel costs price step 1 out of long opening
	// jumps.
	const inf = int64(1) << 60
	prev1, prev2, prev3 := int64(0), inf, inf
	for j := 1; j <= n; j++ {
		land := int64(costs[j-1])
		// The final hop covered d steps for some d in 1..3, paying the
		// landing fee plus the squared jump length.
		cur := prev1 + land + 1
		if cand := prev2 + land + 4; cand < cur {
			cur = cand
		}
		if cand := prev3 + land + 9; cand < cur {
			cur = cand
		}
		prev3 = prev2
		prev2 = prev1
		prev1 = cur
	}
	return prev1
}
