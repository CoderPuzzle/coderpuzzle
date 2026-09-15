func waysToSplit(nums []int) int {
	const MOD = 1000000007
	n := len(nums)
	prefix := make([]int64, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + int64(value)
	}
	total := prefix[n]
	var answer int64
	// prefix is non-decreasing, so for a fixed left cut the legal second
	// cuts form one contiguous range — delimit it with two binary searches.
	for i := 1; i < n-1; i++ {
		left := prefix[i]
		// left <= mid becomes prefix[j] >= 2 * left: first legal j.
		lo := lowerBound1712(prefix, i+1, n, 2*left)
		if lo >= n {
			continue
		}
		// mid <= right becomes prefix[j] <= (total + left) / 2 — the floor
		// is exact because the bound is an integer inequality.
		hi := upperBound1712(prefix, lo, n, (total+left)/2)
		if hi > lo {
			answer = (answer + int64(hi-lo)) % MOD
		}
	}
	return int(answer)
}

func lowerBound1712(a []int64, lo, hi int, value int64) int {
	for lo < hi {
		mid := lo + (hi-lo)/2
		if a[mid] < value {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

func upperBound1712(a []int64, lo, hi int, value int64) int {
	for lo < hi {
		mid := lo + (hi-lo)/2
		if a[mid] <= value {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}
