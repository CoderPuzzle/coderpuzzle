import "math/bits"

func maxLength(arr []string) int {
	n := len(arr)
	// A concatenation is fully described by which of the 26 letters it
	// holds, so each string becomes a bitmask; a self-repeating string
	// (mask -1) can never join a valid combination and is skipped later.
	masks := make([]int, n)
	for i, s := range arr {
		mask := 0
		bad := false
		for _, ch := range []byte(s) {
			bit := 1 << (ch - 'a')
			if mask&bit != 0 {
				bad = true
				break
			}
			mask |= bit
		}
		if bad {
			masks[i] = -1
		} else {
			masks[i] = mask
		}
	}

	best := 0
	var dfs func(index, used int)
	dfs = func(index, used int) {
		// The combination length is just the popcount of its mask.
		total := bits.OnesCount(uint(used))
		if total > best {
			best = total
		}
		// The start index only moves forward: each subsequence is tried
		// once in index order (length is order-independent). Compatible
		// strings are exactly those whose mask ANDs with `used` to zero.
		for j := index; j < n; j++ {
			if masks[j] != -1 && used&masks[j] == 0 {
				dfs(j+1, used|masks[j])
			}
		}
	}
	dfs(0, 0)
	return best
}
