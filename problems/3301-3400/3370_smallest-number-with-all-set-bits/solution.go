func smallestNumber(n int) int {
	// Every number whose bits are all set has the form 2^t - 1. The
	// smallest such value that is >= n uses exactly as many bits as n has,
	// so find that bit length by shifting (a plain loop keeps the fragment
	// import-free) and return the strictly greater power of two minus one
	// (hint 1). With n <= 1000 the result is at most 1023.
	bits := 0
	for m := n; m > 0; m >>= 1 {
		bits++
	}
	return (1 << bits) - 1
}
