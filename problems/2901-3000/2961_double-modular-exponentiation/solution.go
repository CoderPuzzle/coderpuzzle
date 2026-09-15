// Binary exponentiation keeps every intermediate below the modulus squared;
// mod can be 1, so the seed starts at 1 % mod. Last digit of a^b first
// (mod 10), then that residue raised to c modulo m — residues stay below
// 10^3, so squaring fits easily in an int. The index is good exactly when
// the second residue equals target.
func modPow(base, exp, mod int) int {
	result := 1 % mod
	base %= mod
	for exp > 0 {
		if exp&1 != 0 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}

func getGoodIndices(variables [][]int, target int) []int {
	good := []int{}
	for i, row := range variables {
		if modPow(modPow(row[0], row[1], 10), row[2], row[3]) == target {
			good = append(good, i)
		}
	}
	return good
}
