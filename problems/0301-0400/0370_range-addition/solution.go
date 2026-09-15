func getModifiedArray(length int, updates [][]int) []int {
	// Record only where the running total changes: +inc at start,
	// -inc just past end. The extra slot makes end+1 safe at the
	// last index.
	diff := make([]int64, length+1)
	for _, u := range updates {
		diff[u[0]] += int64(u[2])
		diff[u[1]+1] -= int64(u[2])
	}
	// One prefix-sum sweep: position i sees exactly the updates whose
	// ranges still cover it.
	arr := make([]int, length)
	var cur int64
	for i := 0; i < length; i++ {
		cur += diff[i]
		arr[i] = int(cur)
	}
	return arr
}
