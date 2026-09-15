func sumOfEncryptedInt(nums []int) int {
	// Encrypting x keeps its digit count but replaces every digit with
	// the largest one, so the result is largest * repunit(length). Both
	// fall out of one digit scan: p grows as 1, 11, 111, ... while m
	// tracks the max digit seen.
	total := 0
	for _, num := range nums {
		value, largest, repunit := num, 0, 0
		for value > 0 {
			largest = max(largest, value%10)
			repunit = repunit*10 + 1
			value /= 10
		}
		total += largest * repunit
	}
	return total
}
