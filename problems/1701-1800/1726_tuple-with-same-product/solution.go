// Two unordered pairs with equal products never share an element — a * b =
// a * c would force b = c — so any 2 of the c pairs over one product use
// four distinct elements and extend to exactly 8 tuples: choose the two
// pairs (C(c, 2) ways), order each pair (2 * 2), and choose which pair
// plays (a, b) (2). Products top out at 10^8 and the count at a few times
// 10^7, both inside the 32-bit answer type.
func tupleSameProduct(nums []int) int {
	pairs := make(map[int]int)
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			pairs[nums[i]*nums[j]]++
		}
	}
	total := 0
	for _, count := range pairs {
		total += count * (count - 1) / 2 * 8
	}
	return total
}
