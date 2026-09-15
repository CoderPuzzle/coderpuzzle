// Each operation is a local rule: replace every adjacent pair with its sum
// mod 10, shrinking the digit list by one. With at most 100 digits the whole
// reduction is at most ~5000 additions, so simulate it directly and compare
// the two survivors.
func hasSameDigits(s string) bool {
	d := make([]int, len(s))
	for i := 0; i < len(s); i++ {
		d[i] = int(s[i] - '0')
	}
	for n := len(d); n > 2; n-- {
		for i := 0; i+1 < n; i++ {
			d[i] = (d[i] + d[i+1]) % 10
		}
	}
	return d[0] == d[1]
}
