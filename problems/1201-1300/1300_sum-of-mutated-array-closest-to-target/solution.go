func findBestValue(arr []int, target int) int {
	mutatedSum := func(value int) int {
		s := 0
		for _, x := range arr {
			if x < value {
				s += x
			} else {
				s += value
			}
		}
		return s
	}
	hi := arr[0]
	for _, x := range arr {
		if x > hi {
			hi = x
		}
	}
	lo := 0
	for lo < hi {
		mid := lo + (hi-lo)/2
		if mutatedSum(mid) >= target {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	if abs(mutatedSum(lo-1)-target) <= abs(mutatedSum(lo)-target) {
		return lo - 1
	}
	return lo
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
