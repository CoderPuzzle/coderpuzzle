import "sort"

func maxPossibleScore(start []int, d int) int {
	arr := make([]int64, len(start))
	for i, v := range start {
		arr[i] = int64(v)
	}
	sort.Slice(arr, func(i, j int) bool { return arr[i] < arr[j] })
	n := len(arr)
	dd := int64(d)

	feasible := func(x int64) bool {
		last := arr[0]
		for i := 1; i < n; i++ {
			chosen := arr[i]
			if last+x > chosen {
				chosen = last + x
			}
			if chosen > arr[i]+dd {
				return false
			}
			last = chosen
		}
		return true
	}

	lo := int64(0)
	hi := arr[n-1] + dd - arr[0] + 1 // hi is infeasible
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(mid) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return int(lo - 1)
}
