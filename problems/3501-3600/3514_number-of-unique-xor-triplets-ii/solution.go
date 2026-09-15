// Every triplet value is (pair XOR) ^ (third element): the ordering only
// picks indices, and XOR ignores order. Collect all pairwise XORs once, then
// spread them by every element; values stay below 2^11, so both sets hold
// <= 2048 entries.
func uniqueXorTriplets(nums []int) int {
	pairs := make(map[int]bool)
	for _, a := range nums {
		for _, b := range nums {
			pairs[a^b] = true
		}
	}
	triplets := make(map[int]bool)
	for p := range pairs {
		for _, v := range nums {
			triplets[p^v] = true
		}
	}
	return len(triplets)
}
