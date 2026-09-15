// Forward pass fills preL[i] / preLC[i] (L's and LC pairs strictly before
// boundary i) and accumulates base, the LCT count of s. The backward pass
// fills sufT[i] / sufCT[i] (T's and CT pairs at or after boundary i).
// Inserting letter x at boundary i gains sufCT[i] for L, preL[i] * sufT[i]
// for C, and preLC[i] for T, so the answer is base plus the best gain over
// the n + 1 boundaries. Totals peak near ((n+1)/3)^3 ≈ 3.8e13, so int64.
func numOfSubsequences(s string) int64 {
	n := len(s)
	preL := make([]int64, n+1)
	preLC := make([]int64, n+1)
	var base, cntL, cntLC int64
	for i := 0; i < n; i++ {
		preL[i] = cntL
		preLC[i] = cntLC
		switch s[i] {
		case 'L':
			cntL++
		case 'C':
			cntLC += cntL
		case 'T':
			base += cntLC
		}
	}
	preL[n] = cntL
	preLC[n] = cntLC
	sufT := make([]int64, n+1)
	sufCT := make([]int64, n+1)
	var cntT, cntCT int64
	for i := n - 1; i >= 0; i-- {
		sufT[i+1] = cntT
		sufCT[i+1] = cntCT
		switch s[i] {
		case 'T':
			cntT++
		case 'C':
			cntCT += cntT
		}
	}
	sufT[0] = cntT
	sufCT[0] = cntCT
	var gain int64
	for i := 0; i <= n; i++ {
		if sufCT[i] > gain {
			gain = sufCT[i]
		}
		if p := preL[i] * sufT[i]; p > gain {
			gain = p
		}
		if preLC[i] > gain {
			gain = preLC[i]
		}
	}
	return base + gain
}
