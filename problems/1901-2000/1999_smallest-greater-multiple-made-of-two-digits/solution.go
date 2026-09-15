import "sort"

// The only numbers that can qualify are those whose decimal
// representation uses just {digit1, digit2}; there are at most
// 2 + 4 + ... + 2^10 = 2046 of them up to 10 digits (11-digit values
// already exceed 2^31 - 1). Generate every one, sort the list, and scan
// for the first value that is > k and divisible by k. A number never
// starts with 0, so seed the generation with the nonzero digits only.
// Values reach 10^10, so build them in 64-bit arithmetic.
func findInteger(k int, digit1 int, digit2 int) int {
	digits := []int64{int64(digit1)}
	if digit2 != digit1 {
		digits = append(digits, int64(digit2))
	}
	sort.Slice(digits, func(i, j int) bool { return digits[i] < digits[j] })
	cur := []int64{}
	for _, d := range digits {
		if d != 0 {
			cur = append(cur, d)
		}
	}
	var cands []int64
	for len := 0; len < 10; len++ {
		cands = append(cands, cur...)
		var nxt []int64
		for _, v := range cur {
			for _, d := range digits {
				nxt = append(nxt, v*10+d)
			}
		}
		cur = nxt
	}
	sort.Slice(cands, func(i, j int) bool { return cands[i] < cands[j] })
	for _, v := range cands {
		if v > 2147483647 {
			break
		}
		if v > int64(k) && v%int64(k) == 0 {
			return int(v)
		}
	}
	return -1
}
