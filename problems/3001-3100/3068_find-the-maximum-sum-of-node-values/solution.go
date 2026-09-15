func maximumValueSum(nums []int, k int, edges [][]int) int64 {
	base := int64(0)
	posCount := 0
	minPos := int64(0)
	maxNonPos := int64(0)
	hasPos := false
	hasNonPos := false
	// Each operation XORs two endpoints, and tree connectivity lets any
	// even-sized subset of nodes be flipped, so only the parity of the
	// pick matters. d = gain from flipping one node; greedily take every
	// positive delta while tracking the smallest positive and the largest
	// non-positive for a possible parity fix.
	for _, x := range nums {
		d := int64(x^k) - int64(x)
		base += int64(x)
		if d > 0 {
			posCount++
			base += d
			if !hasPos || d < minPos {
				minPos = d
			}
			hasPos = true
		} else {
			if !hasNonPos || d > maxNonPos {
				maxNonPos = d
			}
			hasNonPos = true
		}
	}
	if posCount%2 == 0 {
		return base
	}
	// Odd flip count is illegal: either drop the smallest positive delta
	// or add the largest non-positive one, whichever costs less.
	var best int64
	if hasPos {
		best = minPos
	} else {
		best = int64(1) << 62
	}
	if hasNonPos {
		penalty := -maxNonPos
		if penalty < best {
			best = penalty
		}
	}
	return base - best
}
