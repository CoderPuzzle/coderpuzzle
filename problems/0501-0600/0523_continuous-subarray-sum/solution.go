// Two prefixes with the same remainder mod k sandwich a subarray whose
// sum is a multiple of k, so one pass keeps the running remainder and the
// FIRST index it was seen at. The empty prefix already has remainder 0 —
// seeding it at index -1 certifies windows starting at index 0 and makes
// a zero-sum pair like [0, 0] good, since 0 is a multiple of every k.
func checkSubarraySum(nums []int, k int) bool {
	firstIndex := map[int]int{0: -1}
	remainder := 0
	for index, value := range nums {
		// values reach 1e9 and k reaches 2^31 - 1; int is 64-bit here, so
		// the running sum stays exact before the mod returns it to range.
		remainder = (remainder + value) % k
		// A repeat is a good subarray only when it spans two or more
		// elements, and only the earliest occurrence gives the widest
		// span — keep first, never overwrite.
		earlier, seen := firstIndex[remainder]
		if seen && index-earlier >= 2 {
			return true
		}
		if !seen {
			firstIndex[remainder] = index
		}
	}
	return false
}
