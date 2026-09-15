import "math"

func maximumSum(arr []int) int {
	n := len(arr)
	if n == 1 {
		return arr[0]
	}
	// noDel: max subarray sum ending at i with no deletion
	// oneDel: max subarray sum ending at i with exactly one deletion
	noDel := int64(arr[0])
	oneDel := int64(math.MinInt64) / 2
	best := int64(arr[0])
	for i := 1; i < n; i++ {
		// two origins: deletion already used earlier and the subarray
		// extends through arr[i], or the deletion happens exactly now
		// (drop arr[i] from the previous noDel) — oneDel must be
		// computed first so it reads the pre-update noDel
		oneDel = max(oneDel+int64(arr[i]), noDel)
		noDel = max(noDel+int64(arr[i]), int64(arr[i]))
		best = max(best, noDel, oneDel)
	}
	return int(best)
}
