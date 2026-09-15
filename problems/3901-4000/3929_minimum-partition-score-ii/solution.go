type partitionLine3929 struct {
	slope, intercept, start int64
	count                   int
}

func minPartitionScore(nums []int, k int) int64 {
	prefix := make([]int64, len(nums))
	var total int64
	for i, value := range nums {
		total += int64(value)
		prefix[i] = total
	}
	run := func(penalty int64) (int64, int) {
		hull := []partitionLine3929{{0, 0, -1 << 62, 0}}
		head := 0
		var cost int64
		count := 0
		for _, x := range prefix {
			for head+1 < len(hull) && hull[head+1].start <= x {
				head++
			}
			best := hull[head]
			cost = x*x + penalty + best.slope*x + best.intercept
			count = best.count + 1
			line := partitionLine3929{-2 * x, cost + x*x, -1 << 62, count}
			for len(hull) > 0 {
				old := hull[len(hull)-1]
				difference := line.intercept - old.intercept
				denominator := old.slope - line.slope
				if count > old.count {
					line.start = ceilDiv3929(difference, denominator)
				} else {
					line.start = floorDiv3929(difference, denominator) + 1
				}
				if line.start > old.start {
					break
				}
				hull = hull[:len(hull)-1]
				if head >= len(hull) {
					head = len(hull) - 1
				}
			}
			if len(hull) == 0 {
				line.start = -1 << 62
				head = 0
			}
			hull = append(hull, line)
		}
		return cost, count
	}
	low, high := int64(0), total*total
	for low < high {
		middle := low + (high-low+1)/2
		_, count := run(middle)
		if count >= k {
			low = middle
		} else {
			high = middle - 1
		}
	}
	relaxed, _ := run(low)
	return (relaxed - low*int64(k) + total) / 2
}

func floorDiv3929(value int64, divisor int64) int64 {
	quotient := value / divisor
	if value < 0 && value%divisor != 0 {
		quotient--
	}
	return quotient
}

func ceilDiv3929(value int64, divisor int64) int64 {
	quotient := value / divisor
	if value > 0 && value%divisor != 0 {
		quotient++
	}
	return quotient
}
