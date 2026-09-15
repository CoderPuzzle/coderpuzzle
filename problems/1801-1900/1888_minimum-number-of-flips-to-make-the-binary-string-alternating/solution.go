func minFlips(s string) int {
	n := len(s)
	t := s + s
	// pre[i] = mismatches of t[0:i] against the absolute pattern 0,1,0,1,...
	pre := make([]int, len(t)+1)
	for i := 0; i < len(t); i++ {
		want := byte('0')
		if i&1 == 1 {
			want = '1'
		}
		mismatch := 0
		if t[i] != want {
			mismatch = 1
		}
		pre[i+1] = pre[i] + mismatch
	}
	best := n
	for k := 0; k < n; k++ {
		absMismatch := pre[k+n] - pre[k]
		costA := absMismatch
		if k&1 == 1 {
			costA = n - absMismatch
		}
		if n-costA < best {
			best = n - costA
		}
		if costA < best {
			best = costA
		}
	}
	return best
}
