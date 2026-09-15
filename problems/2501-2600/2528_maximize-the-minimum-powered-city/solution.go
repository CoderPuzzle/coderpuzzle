func maxPower(stations []int, r int, k int) int64 {
	n := len(stations)
	// power[i] = initial number of power stations serving city i
	diff := make([]int64, n+1)
	for i, s := range stations {
		left := i - r
		if left < 0 {
			left = 0
		}
		right := i + r
		if right > n-1 {
			right = n - 1
		}
		diff[left] += int64(s)
		diff[right+1] -= int64(s)
	}
	power := make([]int64, n)
	var cur int64
	for i := 0; i < n; i++ {
		cur += diff[i]
		power[i] = cur
	}

	kk := int64(k)
	minPower := int64(1) << 62
	for _, p := range power {
		if p < minPower {
			minPower = p
		}
	}
	extra := make([]int64, n+1)

	feasible := func(target int64) bool {
		for i := range extra {
			extra[i] = 0
		}
		var cur2 int64
		var used int64
		for i := 0; i < n; i++ {
			cur2 += extra[i]
			have := power[i] + cur2
			if have < target {
				need := target - have
				used += need
				if used > kk {
					return false
				}
				right := i + r
				if right > n-1 {
					right = n - 1
				}
				extra[right+1] -= need
				cur2 += need
			}
		}
		return used <= kk
	}

	// each new station raises any single city's power by at most 1,
	// so the answer never exceeds min(power) + k
	lo, hi := int64(0), minPower+kk
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
