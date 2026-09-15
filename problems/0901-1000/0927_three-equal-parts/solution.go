// Equal parts repeat one binary value, so the array's 1s must divide into
// three equal counts; the third part's 1s are the final k = total/3 ones,
// and the suffix from its first 1 to the end is the exact bit pattern every
// part must show after its own leading zeros. Both earlier parts begin at a
// known 1 — the array's first, and the (k+1)-th — so comparing the L bits
// past each anchor against that suffix decides everything, and the cut
// points sit exactly L bits past the anchors.
func threeEqualParts(arr []int) []int {
	total := 0
	for _, value := range arr {
		total += value
	}
	if total == 0 {
		return []int{0, 2}
	}
	if total%3 != 0 {
		return []int{-1, -1}
	}
	k := total / 3
	first, second, third := -1, -1, -1
	seen := 0
	for index, value := range arr {
		if value == 1 {
			seen++
			switch seen {
			case 1:
				first = index
			case k + 1:
				second = index
			case 2*k + 1:
				third = index
			}
		}
	}
	length := len(arr) - 1 - third
	for _, anchor := range []int{first, second} {
		for offset := 0; offset <= length; offset++ {
			if arr[anchor+offset] != arr[third+offset] {
				return []int{-1, -1}
			}
		}
	}
	return []int{first + length, second + length + 1}
}
