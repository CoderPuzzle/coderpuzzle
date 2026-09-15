// XOR is addition without the carries; AND marks every position that
// produces a carry, and shifting it left one place lines the carries up
// under the digits they inflate. Repeat until no carry remains. Go's int
// is the machine's two's-complement word, so the mask is implicit in
// every operation and negative operands wrap exactly as they should.
func getSum(a int, b int) int {
	for b != 0 {
		carry := (a & b) << 1
		a = a ^ b
		b = carry
	}
	return a
}
