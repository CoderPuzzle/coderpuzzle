func kthSmallestProduct(nums1 []int, nums2 []int, k int64) int64 {
	floorDiv := func(a, b int64) int64 {
		q := a / b
		r := a % b
		if r != 0 && (r < 0) != (b < 0) {
			q--
		}
		return q
	}
	// number of elements <= t
	upperBound := func(a []int, t int64) int {
		lo, hi := 0, len(a)
		for lo < hi {
			mid := (lo + hi) / 2
			if int64(a[mid]) <= t {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		return lo
	}
	// number of elements < t
	lowerBound := func(a []int, t int64) int {
		lo, hi := 0, len(a)
		for lo < hi {
			mid := (lo + hi) / 2
			if int64(a[mid]) < t {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		return lo
	}
	countLe := func(v int64) int64 {
		var cnt int64
		n2 := int64(len(nums2))
		for _, x := range nums1 {
			if x > 0 {
				// x * y <= v  ->  y <= floor(v / x)
				cnt += int64(upperBound(nums2, floorDiv(v, int64(x))))
			} else if x < 0 {
				// x * y <= v, x < 0  ->  y >= ceil(v / x)
				cnt += n2 - int64(lowerBound(nums2, -floorDiv(-v, int64(x))))
			} else {
				// x == 0: product is 0
				if v >= 0 {
					cnt += n2
				}
			}
		}
		return cnt
	}

	lo, hi := int64(-10000000000)-1, int64(10000000000)+1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countLe(mid) >= k {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
