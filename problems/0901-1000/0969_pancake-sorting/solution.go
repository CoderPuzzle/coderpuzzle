// The pinned answer is a selection sort from the largest value down. For
// each size s, the unsorted prefix a[:s] still holds exactly the values
// 1..s, so the value to place is the largest one present. One flip
// brings it to the front (skipped when it already sits there), the flip
// with k = s carries it to index s-1, where no later flip — all of which
// reverse a strictly shorter prefix — can ever reach it again. At most
// two flips per size, so at most 2*(n-1) in all, well inside the 10*n
// acceptance bound.
func pancakeSort(arr []int) []int {
	a := make([]int, len(arr))
	copy(a, arr)
	flips := make([]int, 0, 2*len(arr))
	for size := len(a); size >= 2; size-- {
		idx := 0
		for i := 1; i < size; i++ {
			if a[i] > a[idx] {
				idx = i
			}
		}
		if idx == size-1 {
			continue
		}
		if idx != 0 {
			flips = append(flips, idx+1)
			reversePrefix(a, idx+1)
		}
		flips = append(flips, size)
		reversePrefix(a, size)
	}
	return flips
}

func reversePrefix(a []int, k int) {
	for lo, hi := 0, k-1; lo < hi; lo, hi = lo+1, hi-1 {
		a[lo], a[hi] = a[hi], a[lo]
	}
}
