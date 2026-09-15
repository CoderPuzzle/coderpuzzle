func findArray(pref []int) []int {
	// arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and xor
	// is its own inverse, so the original array falls out of one linear
	// difference pass. Written into a fresh output so the caller's pref is
	// never disturbed.
	arr := make([]int, len(pref))
	arr[0] = pref[0]
	for i := 1; i < len(pref); i++ {
		arr[i] = pref[i] ^ pref[i-1]
	}
	return arr
}
