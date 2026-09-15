func minimumCost(nums []int, k int) int {
	const m int64 = 1000000007
	var s int64
	for _, x := range nums {
		s += int64(x)
	}
	c := (s+int64(k)-1)/int64(k) - 1
	if c < 0 {
		c = 0
	}
	a, b := c, c+1
	if a%2 == 0 {
		a /= 2
	} else {
		b /= 2
	}
	return int((a % m) * (b % m) % m)
}
