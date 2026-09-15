import "sort"

// Sorting produces the one arrangement that could possibly be a valid
// progression; check its consecutive gaps are all equal.
func canMakeArithmeticProgression(arr []int) bool {
	a := make([]int, len(arr))
	copy(a, arr)
	sort.Ints(a)
	diff := int64(a[1]) - int64(a[0])
	for i := 2; i < len(a); i++ {
		if int64(a[i])-int64(a[i-1]) != diff {
			return false
		}
	}
	return true
}
