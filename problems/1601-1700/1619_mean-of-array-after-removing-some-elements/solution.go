import "sort"

func trimMean(arr []int) float64 {
	a := make([]int, len(arr))
	copy(a, arr)
	sort.Ints(a)
	n := len(a)
	trim := n / 20 // 5% of n, always a whole number since n is a multiple of 20
	sum := 0
	for _, v := range a[trim : n-trim] {
		sum += v
	}
	return float64(sum) / float64(n-2*trim)
}
