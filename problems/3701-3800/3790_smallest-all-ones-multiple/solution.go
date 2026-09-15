func minAllOneMultiple(k int) int {
	// Only the remainder of the growing repunit matters: appending a
	// digit maps rem -> (rem * 10 + 1) % k, so lengths are walked
	// upward without ever building a number past 10 * k. A nonzero
	// remainder is one of k - 1 values; the seen array flags each
	// visit, and a repeat means the remainders cycle forever -> -1
	// (exactly the k divisible by 2 or 5, since a repunit ends in 1).
	// Every value stays below 1e6, well inside the int range.
	rem := 1 % k
	length := 1
	seen := make([]bool, k)
	for rem != 0 && !seen[rem] {
		seen[rem] = true
		rem = (rem*10 + 1) % k
		length++
	}
	if rem == 0 {
		return length
	}
	return -1
}
