func maximumValue(n int, s int, m int) int64 {
	if n == 1 {
		return int64(s)
	}
	highCount := int64(n / 2)
	increaseFirst := int64(s) + int64(m) + (highCount-1)*int64(m-1)
	decreaseFirst := int64(s) + int64(m) - 1 + (highCount-1)*int64(m-1)
	if increaseFirst > decreaseFirst {
		return increaseFirst
	}
	return decreaseFirst
}
