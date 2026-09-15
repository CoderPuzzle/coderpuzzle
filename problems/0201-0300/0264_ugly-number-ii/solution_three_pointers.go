func nthUglyNumber(n int) int {
	// Every ugly number past 1 is a smaller ugly times 2, 3, or 5, so the
	// sequence is generated in order as the merge of three virtual lists
	// 2·U, 3·U, 5·U — no testing of arbitrary integers for ugliness.
	ugly := make([]int, n+1)
	ugly[0] = 1
	// One cursor per list, sitting on the source of its smallest
	// not-yet-emitted element.
	i2, i3, i5 := 0, 0, 0
	for i := 1; i <= n; i++ {
		m2, m3, m5 := ugly[i2]*2, ugly[i3]*3, ugly[i5]*5
		// The next ugly number is the smallest head of the three lists.
		nxt := m2
		if m3 < nxt {
			nxt = m3
		}
		if m5 < nxt {
			nxt = m5
		}
		ugly[i] = nxt
		// Advance EVERY cursor whose candidate matched: 6 arises as both
		// 2·3 and 3·2, and the dual advance suppresses such duplicates.
		if nxt == m2 {
			i2++
		}
		if nxt == m3 {
			i3++
		}
		if nxt == m5 {
			i5++
		}
	}
	// The array carries a leading 1, so the n-th ugly number is at n-1.
	return ugly[n-1]
}
