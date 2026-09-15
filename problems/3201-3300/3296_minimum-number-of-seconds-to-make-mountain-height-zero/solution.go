import "math"

func minNumberOfSeconds(mountainHeight int, workerTimes []int) int64 {
	maxW := 0
	for _, wt := range workerTimes {
		if wt > maxW {
			maxW = wt
		}
	}
	h := int64(mountainHeight)
	hi := int64(maxW) * h * (h + 1) / 2
	lo := int64(0)
	for lo < hi {
		mid := lo + (hi-lo)/2
		total := int64(0)
		for _, wt := range workerTimes {
			total += units(int64(wt), mid)
			if total >= h {
				break
			}
		}
		if total >= h {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

// units returns the largest x such that wt * x*(x+1)/2 <= t.
func units(wt, t int64) int64 {
	c := (2 * t) / wt
	v := 1 + 4*c
	r := int64(math.Sqrt(float64(v)))
	if r < 0 {
		r = 0
	}
	for r*r > v {
		r--
	}
	for (r+1)*(r+1) <= v {
		r++
	}
	return (r - 1) / 2
}
