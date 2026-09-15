// Walk both arrays from the least-significant digit (the end) toward
// the most-significant, keeping a running carry. At each column, total
// = d1 + d2 + carry can temporarily fall outside {0, 1} (it even goes
// negative), so the digit and the next carry are pulled out with
// bitwise ops instead of a sign-prone mod/div: total & 1 is the digit,
// because in two's-complement form the low bit of total already
// equals total's floor-mod-2 regardless of sign. The next carry is
// -(total >> 1), where >> is an arithmetic (floor) shift on Go's
// signed int, matching the base -2 identity total = digit + (-2) *
// carry. The carry provably stays within {-1, 0, 1} the whole way, so
// nothing overflows.
func addNegabinary(arr1 []int, arr2 []int) []int {
	i, j := len(arr1)-1, len(arr2)-1
	carry := 0
	digits := []int{}
	for i >= 0 || j >= 0 || carry != 0 {
		d1, d2 := 0, 0
		if i >= 0 {
			d1 = arr1[i]
		}
		if j >= 0 {
			d2 = arr2[j]
		}
		total := d1 + d2 + carry
		digits = append(digits, total&1)
		carry = -(total >> 1)
		i--
		j--
	}
	for l, r := 0, len(digits)-1; l < r; l, r = l+1, r-1 {
		digits[l], digits[r] = digits[r], digits[l]
	}
	k := 0
	for k < len(digits)-1 && digits[k] == 0 {
		k++
	}
	return digits[k:]
}
