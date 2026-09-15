import "math/bits"

func popcountDepth(n int64, k int) int64 {
	// depth[j] = popcount-depth of the value j itself: 1 has depth 0,
	// deeper values sit one step past their own popcount.
	var depth [64]int
	for j := 2; j < 64; j++ {
		depth[j] = depth[bits.OnesCount64(uint64(j))] + 1
	}
	// Digit DP over the binary digits of n: free[x] counts prefixes
	// already strictly below n's prefix that carry x set bits, while
	// tightOnes follows n's exact prefix. Answers reach ~5e14, past
	// the int32 range.
	var free [64]int64
	tightOnes := 0
	for i := bits.Len64(uint64(n)) - 1; i >= 0; i-- {
		var nxt [64]int64
		copy(nxt[:], free[:])
		for x := 0; x < 64; x++ {
			if free[x] != 0 {
				nxt[x+1] += free[x]
			}
		}
		if (n>>i)&1 == 1 {
			// Place 0 under n's 1: that branch goes loose, free
			// to take any suffix of the remaining bits.
			nxt[tightOnes] += 1
			tightOnes++
		}
		free = nxt
	}
	// counts[x] = integers in [1, n] with x set bits (0 included).
	var counts [64]int64
	copy(counts[:], free[:])
	counts[tightOnes] += 1
	counts[0] -= 1 // the all-zero string is not a positive integer
	counts[1] -= 1 // x = 1 itself has depth 0, not depth 1
	answer := int64(0)
	if k == 0 {
		answer = 1
	}
	for j := 1; j < 64; j++ {
		if depth[j] == k-1 {
			answer += counts[j]
		}
	}
	return answer
}
