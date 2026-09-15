import (
	"sort"
)

func maxCount(banned []int, n int, maxSum int64) int {
	// Smallest-first greedy computed gap by gap over the sorted,
	// de-duplicated bans: a free run of `avail` candidates starting at
	// `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The first
	// run that cannot fit contains the answer's cutoff — every later
	// candidate is larger — so exactly one binary search caps it and the
	// walk stops there. Cost terms peak near avail*n ~ 3*10^18, inside
	// the int64 range; the answer itself is <= sqrt(2*maxSum)
	// <= sqrt(2*10^15) ~ 4.5e7, far below 2^31.
	sort.Ints(banned)
	banned = banned[:uniqueSorted(banned)]
	ladder := func(lo, cnt int64) int64 {
		return cnt * (2*lo + cnt - 1) / 2
	}
	bestPrefix := func(lo, avail int64) int {
		low := int64(0)
		high := avail
		for low < high {
			mid := (low + high + 1) / 2
			if ladder(lo, mid) <= maxSum {
				low = mid
			} else {
				high = mid - 1
			}
		}
		return int(low)
	}
	taken := int64(0)
	prev := int64(0)
	finished := false
	for _, value := range banned {
		avail := int64(value) - prev - 1
		if avail > 0 {
			lo := prev + 1
			cost := ladder(lo, avail)
			if cost <= maxSum {
				taken += avail
				maxSum -= cost
			} else {
				taken += int64(bestPrefix(lo, avail))
				finished = true
				break
			}
		}
		prev = int64(value)
	}
	if !finished && int64(n) > prev {
		lo := prev + 1
		avail := int64(n) - prev
		cost := ladder(lo, avail)
		if cost <= maxSum {
			taken += avail
		} else {
			taken += int64(bestPrefix(lo, avail))
		}
	}
	return int(taken)
}

func uniqueSorted(sorted []int) int {
	out := 0
	for _, v := range sorted {
		if out == 0 || sorted[out-1] != v {
			sorted[out] = v
			out++
		}
	}
	return out
}
