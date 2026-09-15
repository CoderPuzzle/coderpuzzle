import "sort"

func findTheDistanceValue(arr1 []int, arr2 []int, d int) int {
	sorted2 := append([]int(nil), arr2...)
	sort.Ints(sorted2)
	count := 0
	for _, value := range arr1 {
		i := sort.SearchInts(sorted2, value)
		close := false
		if i < len(sorted2) && sorted2[i]-value <= d {
			close = true
		}
		if i > 0 && value-sorted2[i-1] <= d {
			close = true
		}
		if !close {
			count++
		}
	}
	return count
}
