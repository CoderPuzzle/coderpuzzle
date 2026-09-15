func maxValueAfterReverse(nums []int) int {
	// Reversing [L, R] only rewires the two boundary links. Gains split into:
	// prefix/suffix reversals (one boundary term each) and interior reversals,
	// bounded by 2*(max adjacent min - min adjacent max).
	n := len(nums)
	total := 0
	for i := 0; i+1 < n; i++ {
		total += abs(nums[i] - nums[i+1])
	}
	bestGain := 0
	big := -(1 << 62) // max over adjacent-pair minima
	small := 1 << 62  // min over adjacent-pair maxima
	for i := 0; i+1 < n; i++ {
		a, b := nums[i], nums[i+1]
		// reverse [0..i]: the (i, i+1) link becomes (0, i+1)
		if gain := abs(nums[0]-b) - abs(a-b); gain > bestGain {
			bestGain = gain
		}
		// reverse [i+1..n-1]: the (i, i+1) link becomes (i, n-1)
		if gain := abs(nums[n-1]-a) - abs(a-b); gain > bestGain {
			bestGain = gain
		}
		if lo := min(a, b); lo > big {
			big = lo
		}
		if hi := max(a, b); hi < small {
			small = hi
		}
	}
	if big > small {
		if gain := 2 * (big - small); gain > bestGain {
			bestGain = gain
		}
	}
	return total + bestGain
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
