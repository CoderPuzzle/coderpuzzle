import "math"

func maximumScore(nums []int, k int) int64 {
	// Each subarray contributes a +max and a -min mark, so at most
	// min(k, n // 2) opposite pairs exist; a pair's credit is its plus
	// mark minus its minus mark -- exactly one subarray's range.
	size := min(k, len(nums)/2) + 1
	neg := int64(math.MinInt64 / 4)
	fresh := func() []int64 {
		s := make([]int64, size)
		for i := range s {
			s[i] = neg
		}
		return s
	}
	// Close a pair: the count grows by one.
	shiftAdd := func(s []int64, d int64) []int64 {
		out := fresh()
		for i := 1; i < size; i++ {
			if s[i-1] > neg {
				out[i] = s[i-1] + d
			}
		}
		return out
	}
	bump := func(s []int64, d int64) []int64 {
		out := append([]int64(nil), s...)
		for i := range out {
			if out[i] > neg {
				out[i] += d
			}
		}
		return out
	}
	merge := func(a, b []int64) []int64 {
		out := make([]int64, size)
		for i := range out {
			if a[i] >= b[i] {
				out[i] = a[i]
			} else {
				out[i] = b[i]
			}
		}
		return out
	}

	// Phase 0: closed[j] = j pairs done; op/om = one open pair started with
	// a +/- still owing its opposite sign.
	closed, op, om := fresh(), fresh(), fresh()
	closed[0] = 0
	// Phase 1: wp/wm = the seam pair open, started +/-; wXY = seam X and an
	// open middle pair Y; fz = the seam pair has closed.
	wp, wm, wpp, wpm, wmp, wmm, fz := fresh(), fresh(), fresh(), fresh(), fresh(), fresh(), fresh()

	for _, a := range nums {
		a64 := int64(a)
		pristine := closed[0]

		nOp := merge(op, bump(closed, a64))
		nOm := merge(om, bump(closed, -a64))
		nClosed := merge(merge(closed, shiftAdd(op, -a64)), shiftAdd(om, a64))

		nWp, nWm := append([]int64(nil), wp...), append([]int64(nil), wm...)
		if pristine+a64 > nWp[0] {
			nWp[0] = pristine + a64 // seam opens at the first mark
		}
		if pristine-a64 > nWm[0] {
			nWm[0] = pristine - a64
		}
		nWpp := merge(wpp, bump(wp, a64))
		nWpm := merge(wpm, bump(wp, -a64))
		nWmp := merge(wmp, bump(wm, a64))
		nWmm := merge(wmm, bump(wm, -a64))
		nWp = merge(nWp, shiftAdd(wpp, -a64))
		nWp = merge(nWp, shiftAdd(wpm, a64))
		nWm = merge(nWm, shiftAdd(wmp, -a64))
		nWm = merge(nWm, shiftAdd(wmm, a64))
		nFz := merge(merge(fz, shiftAdd(wp, -a64)), shiftAdd(wm, a64))

		closed, op, om = nClosed, nOp, nOm
		wp, wm, wpp, wpm, wmp, wmm, fz = nWp, nWm, nWpp, nWpm, nWmp, nWmm, nFz
	}

	best := int64(0)
	for i := 0; i < size; i++ {
		best = max(best, max(closed[i], fz[i]))
	}
	return best
}
