// AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
// repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
func getXORSum(arr1 []int, arr2 []int) int {
	x := 0
	for _, a := range arr1 {
		x ^= a
	}
	y := 0
	for _, b := range arr2 {
		y ^= b
	}
	return x & y
}
