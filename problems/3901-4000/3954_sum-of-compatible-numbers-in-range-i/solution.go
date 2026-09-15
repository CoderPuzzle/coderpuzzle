func sumOfGoodIntegers(n int, k int) int {
	s := 0
	l := n - k
	if l < 1 {
		l = 1
	}
	for x := l; x <= n+k; x++ {
		if n&x == 0 {
			s += x
		}
	}
	return s
}
