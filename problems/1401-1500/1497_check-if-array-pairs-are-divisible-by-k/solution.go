func canArrange(arr []int, k int) bool {
	freq := make([]int, k)
	for _, x := range arr {
		r := x % k
		if r < 0 {
			r += k
		}
		freq[r]++
	}
	// the zero class must pair within itself -> even count
	if freq[0]%2 != 0 {
		return false
	}
	// complementary classes r and k-r must match exactly (any pairing
	// inside matched classes works, so counts alone decide)
	for i := 1; i <= k/2; i++ {
		if freq[i] != freq[k-i] {
			return false
		}
	}
	return true
}
