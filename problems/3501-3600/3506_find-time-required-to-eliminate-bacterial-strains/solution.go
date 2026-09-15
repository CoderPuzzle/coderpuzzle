// The splitting process is a full binary tree: a leaf at depth d is a
// WBC that starts working at d * splitTime. Deadline T is reachable iff
// strain i can sit on a leaf of depth d <= (T - timeReq[i]) / splitTime,
// and legal leaf-depth multisets are exactly the Kraft-legal ones
// (sum 2^-d <= 1) -- minimized by taking every strain at its full depth
// bound. Binary search the minimal T. Deadlines reach ~1e14, so all
// bounds arithmetic is int64.
func minEliminationTime(timeReq []int, splitTime int) int64 {
	n := len(timeReq)
	mx := 0
	for _, t := range timeReq {
		if t > mx {
			mx = t
		}
	}
	lo := int64(mx) + int64(splitTime)
	hi := int64(mx) + int64(n-1)*int64(splitTime)
	for lo < hi {
		mid := lo + (hi-lo)/2
		slots := 0
		deep := 0
		ok := true
		for _, t := range timeReq {
			d := (mid - int64(t)) / int64(splitTime)
			if d < 1 {
				ok = false
				break
			}
			if d > 30 {
				// bounds past depth 30 fit together in less than one
				// 2^-30 unit of slack (n < 2^17 strains), so count all
				// of them as a single unit
				deep = 1
			} else {
				slots += 1 << (30 - int(d))
				if slots > 1<<30 {
					ok = false
					break
				}
			}
		}
		if ok && int64(slots+deep) <= 1<<30 {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
