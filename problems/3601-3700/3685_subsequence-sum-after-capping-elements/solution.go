func subsequenceSumAfterCapping(nums []int, k int) []bool {
	n := len(nums)
	words := (k + 64) / 64
	reach := make([]uint64, words)
	shifted := make([]uint64, words)
	reach[0] = 1
	counts := make([]int, n+1)
	for _, value := range nums {
		counts[value]++
	}
	answer := make([]bool, n)
	leq := 0
	for x := 1; x <= n; x++ {
		for c := 0; c < counts[x]; c++ {
			foldIn(reach, shifted, x)
		}
		leq += counts[x]
		above := n - leq
		found := false
		for m, r := 0, k; m <= above && r >= 0; m, r = m+1, r-x {
			if reach[r>>6]>>(r&63)&1 != 0 {
				found = true
				break
			}
		}
		answer[x-1] = found
	}
	return answer
}

func foldIn(reach, shifted []uint64, x int) {
	wordShift := x >> 6
	bitShift := uint(x & 63)
	for i := range shifted {
		src := i - wordShift
		var value uint64
		if src >= 0 {
			value = reach[src] << bitShift
			if bitShift != 0 && src >= 1 {
				value |= reach[src-1] >> (64 - bitShift)
			}
		}
		shifted[i] = value
	}
	for i := range shifted {
		reach[i] |= shifted[i]
	}
}
