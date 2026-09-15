import "sort"

func getStrongest(arr []int, k int) []int {
	sortedArr := make([]int, len(arr))
	copy(sortedArr, arr)
	sort.Ints(sortedArr)
	m := sortedArr[(len(arr)-1)/2]
	key := func(v int) (int, int) {
		d := v - m
		if d < 0 {
			d = -d
		}
		return d, v
	}
	sort.Slice(arr, func(i, j int) bool {
		di, vi := key(arr[i])
		dj, vj := key(arr[j])
		if di != dj {
			return di > dj
		}
		return vi > vj
	})
	return arr[:k]
}
