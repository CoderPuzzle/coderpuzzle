// Binary-search the peak m = nums[index]. Any valid array with that peak
// has nums[i] >= max(m - |i - index|, 1) everywhere, and the array that
// sits exactly on those bounds is itself valid, so its sum decides
// feasibility and grows strictly with m. Probing m up to maxSum = 10^9
// makes the side sums reach about 5*10^17, past 32 bits, so the search
// and both side sums run in int64.
func maxValue(n int, index int, maxSum int) int {
	side := func(m int64, width int64) int64 {
		if width >= m {
			return m*(m-1)/2 + width - (m - 1)
		}
		return width*m - width*(width+1)/2
	}
	lo, hi := int64(1), int64(maxSum)
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if mid+side(mid, int64(index))+side(mid, int64(n-1-index)) <= int64(maxSum) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return int(lo)
}
