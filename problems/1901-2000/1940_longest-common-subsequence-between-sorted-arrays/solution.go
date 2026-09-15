// Each array is strictly increasing, so a value appears at most once per
// array; it is common to all arrays exactly when it is counted len(arrays)
// times. Values are bounded by 1..100, so a fixed-size count array replaces
// the map and yields ascending order for free.
func longestCommonSubsequence(arrays [][]int) []int {
	var counts [101]int
	for _, arr := range arrays {
		for _, value := range arr {
			counts[value]++
		}
	}
	result := []int{}
	for v := 1; v <= 100; v++ {
		if counts[v] == len(arrays) {
			result = append(result, v)
		}
	}
	return result
}
