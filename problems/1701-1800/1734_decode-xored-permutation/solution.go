// The chain perm[i+1] = perm[i] ^ encoded[i] unrolls the whole
// permutation from perm[0], which the permutation premise pins:
// total = 1 ^ ... ^ n is known in advance, and XOR-ing the
// odd-index encoded entries telescopes to perm[1] ^ ... ^
// perm[n-1] — covering every element but perm[0] exactly
// because n is odd — so perm[0] = total ^ that.
func decode(encoded []int) []int {
	n := len(encoded) + 1
	total := 0
	for value := 1; value <= n; value++ {
		total ^= value
	}
	odd := 0
	for i := 1; i < len(encoded); i += 2 {
		odd ^= encoded[i]
	}
	perm := make([]int, n)
	perm[0] = total ^ odd
	for i, value := range encoded {
		perm[i+1] = perm[i] ^ value
	}
	return perm
}
