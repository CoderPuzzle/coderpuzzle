// The blue region after minute n is a diamond of Chebyshev radius n-1
// around the first cell: ring k adds 4*k cells, so the total is
// 1 + 4*(0+1+...+(n-1)) = 2n^2 - 2n + 1. The product needs int64: at
// n = 10^5 it reaches ~2*10^10, beyond what a 32-bit int can hold.
func coloredCells(n int) int64 {
	return 2*int64(n)*int64(n) - 2*int64(n) + 1
}
