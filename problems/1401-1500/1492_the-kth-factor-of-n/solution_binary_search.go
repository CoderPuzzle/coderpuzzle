func kthFactor(n int, k int) int {
	countAtMost := func(m int) int {
		// Count divisors of n up to m by pairing d with n / d.
		count := 0
		for d := 1; d*d <= n; d++ {
			if n%d == 0 {
				if d <= m {
					count++
				}
				if complement := n / d; complement != d && complement <= m {
					count++
				}
			}
		}
		return count
	}
	lo, hi := 1, n
	for lo < hi {
		mid := (lo + hi) / 2
		if countAtMost(mid) >= k {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	if countAtMost(lo) >= k {
		return lo
	}
	return -1
}
