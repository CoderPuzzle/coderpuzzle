// A peak's two neighbours (circular) can never themselves be peaks, so they
// keep their original values and making position i a peak costs
// max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min64(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}

func minOperations(nums []int, k int) int64 {
	n := len(nums)
	if k == 0 {
		return 0
	}
	if k > n/2 {
		return -1 // a circle admits at most floor(n/2) peaks
	}
	const INF int64 = 4000000000000000000
	c := make([]int64, n)
	for i := 1; i < n; i++ {
		prev := nums[0]
		if i >= 2 {
			prev = nums[i-1]
		}
		nxt := nums[0]
		if i <= n-2 {
			nxt = nums[i+1]
		}
		c[i] = int64(maxInt(prev, nxt)) + 1 - int64(nums[i])
		if c[i] < 0 {
			c[i] = 0
		}
	}
	// Capped knapsack over positions 1..n-1: notPeak[j]/peak[j] are the cheapest
	// ways to reach j peaks (j == cap means "at least cap") with the current
	// position left unpicked / picked.
	linear := func(cap int, forceStart, forceEnd bool) int64 {
		notPeak := make([]int64, cap+1)
		peak := make([]int64, cap+1)
		for j := range notPeak {
			notPeak[j] = INF
			peak[j] = INF
		}
		notPeak[0] = 0
		if !forceStart && cap >= 1 {
			peak[1] = c[1]
		}
		for i := 2; i < n; i++ {
			newNot := make([]int64, cap+1)
			newPeak := make([]int64, cap+1)
			for j := range newPeak {
				newPeak[j] = INF
			}
			for j := 0; j <= cap; j++ {
				newNot[j] = min64(notPeak[j], peak[j])
			}
			// A peak needs the previous position unpicked; over cap, extra peaks
			// stay folded into the top cell.
			if !(i == n-1 && forceEnd) {
				base := c[i]
				for j := 1; j < cap; j++ {
					v := notPeak[j-1]
					if v < INF {
						newPeak[j] = v + base
					}
				}
				if cap >= 1 {
					v := min64(notPeak[cap-1], notPeak[cap])
					if v < INF {
						newPeak[cap] = v + base
					}
				}
			}
			notPeak, peak = newNot, newPeak
		}
		return min64(notPeak[cap], peak[cap])
	}
	// Case A: index 0 is a peak, so positions 1 and n-1 cannot be peaks.
	cost0 := int64(maxInt(nums[n-1], nums[1])) + 1 - int64(nums[0])
	if cost0 < 0 {
		cost0 = 0
	}
	ansA := cost0 + linear(maxInt(0, k-1), true, true)
	// Case B: index 0 stays unpicked; all other positions are free.
	ansB := linear(k, false, false)
	ans := min64(ansA, ansB)
	if ans >= INF {
		return -1
	}
	return ans
}
