// Fix the middle index m and count (left pair, right pair) combos where
// x = nums[m] is the unique mode. With a+b >= 2 side copies of x its
// frequency 1+a+b is untouchable; with exactly one side copy the 3 non-x
// picks must be pairwise distinct. Per-middle terms stay below ~4 * 10^12,
// so they are accumulated in an int64 and reduced modulo 10^9 + 7 each
// middle.
func subsequencesWithMiddleMode(nums []int) int {
	const mod = 1000000007
	c2 := func(t int) int64 {
		return int64(t) * int64(t-1) / 2
	}
	n := len(nums)
	ids := make(map[int]int)
	comp := make([]int, n)
	for i, v := range nums {
		id, ok := ids[v]
		if !ok {
			id = len(ids)
			ids[v] = id
		}
		comp[i] = id
	}
	d := len(ids)
	cntL := make([]int, d)
	cntR := make([]int, d)
	SL, SR := int64(0), int64(0)
	for i := 1; i < n; i++ {
		SR += int64(cntR[comp[i]])
		cntR[comp[i]]++
	}
	ans := int64(0)
	for m := 0; m < n; m++ {
		x := comp[m]
		if m > 0 {
			// advance: nums[m-1] joins the left, nums[m] leaves the right
			y := comp[m-1]
			SL += int64(cntL[y])
			cntL[y]++
			SR -= int64(cntR[x] - 1)
			cntR[x]--
		}
		l, r := cntL[x], cntR[x]
		ml, mr := m-l, n-1-m-r
		cl, cr := c2(l), c2(r)
		// pair sums over non-x values only: x contributes cl / cr itself
		SxL, SxR := SL-cl, SR-cr
		// exactly one side copy of x: the right pair avoids the left pick's
		// value (T_R), or mirrored (T_L)
		var TR, TL int64
		for u := 0; u < d; u++ {
			if lu := cntL[u]; lu > 0 && u != x {
				cR := cntR[u]
				TR += int64(lu) * (c2(mr-cR) - SxR + c2(cR))
			}
		}
		for u := 0; u < d; u++ {
			if ru := cntR[u]; ru > 0 && u != x {
				cL := cntL[u]
				TL += int64(ru) * (c2(ml-cL) - SxL + c2(cL))
			}
		}
		total := cl*c2(mr) + cl*int64(r)*int64(mr) + cl*cr +
			int64(l)*int64(ml)*int64(r)*int64(mr) + int64(l)*int64(ml)*cr +
			c2(ml)*cr + int64(l)*TR + int64(r)*TL
		ans = (ans + total) % mod
	}
	return int(ans)
}
