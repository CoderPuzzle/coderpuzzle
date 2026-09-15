// One operation is the linear map (I + S) on the digit vector over Z/10,
// so after t = n-2 operations digit k is sum_j C(t, j) * d[k+j] mod 10.
// C(t, j) mod 10 is CRT-assembled from Lucas values mod 2 (bit-subset
// test) and mod 5 (digit products) — no length-10^5 Pascal row is ever
// materialized.
func hasSameDigits(s string) bool {
	t := len(s) - 2
	// cm5[a][b] = C(a, b) mod 5 for single base-5 digits
	var cm5 [5][5]int
	for a := 0; a < 5; a++ {
		cm5[a][0] = 1
		for b := 1; b <= a; b++ {
			cm5[a][b] = (cm5[a-1][b-1] + cm5[a-1][b]) % 5
		}
	}
	// crt[r2][r5] = the digit x in 0..9 with x % 2 == r2 and x % 5 == r5
	var crt [2][5]int
	for x := 0; x < 10; x++ {
		crt[x%2][x%5] = x
	}
	a, b := 0, 0
	for j := 0; j <= t; j++ {
		// Lucas mod 2: C(t, j) is odd iff every bit of j is a bit of t.
		r2 := 1
		if j&^t != 0 {
			r2 = 0
		}
		r5, tj, jj := 1, t, j
		for jj > 0 {
			r5 = r5 * cm5[tj%5][jj%5] % 5
			tj /= 5
			jj /= 5
		}
		c := crt[r2][r5]
		a = (a + c*int(s[j]-'0')) % 10
		b = (b + c*int(s[j+1]-'0')) % 10
	}
	return a == b
}
