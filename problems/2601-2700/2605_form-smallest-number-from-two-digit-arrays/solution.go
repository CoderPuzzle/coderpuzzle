// A shared digit admits a one-digit answer; otherwise two digits suffice.
func minNumber(nums1 []int, nums2 []int) int {
	var present [10]bool
	for _, d := range nums2 {
		present[d] = true
	}
	common := 10
	for _, d := range nums1 {
		if present[d] && d < common {
			common = d
		}
	}
	if common < 10 {
		return common
	}
	// No overlap: the tens digit is whichever array holds the globally
	// smaller minimum.
	a, b := 10, 10
	for _, d := range nums1 {
		if d < a {
			a = d
		}
	}
	for _, d := range nums2 {
		if d < b {
			b = d
		}
	}
	if 10*a+b < 10*b+a {
		return 10*a + b
	}
	return 10*b + a
}
