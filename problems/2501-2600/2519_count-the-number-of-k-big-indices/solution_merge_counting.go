func kBigIndices(nums []int, k int) int {
	// One merge sort over value/index pairs fills both tallies at once.
	// When a merge places a left-half element, every right-half element
	// already placed is strictly smaller than it; when it places a
	// right-half element, a crawl over the sorted left run counts its
	// strictly smaller predecessors. Each pair of positions is weighed
	// at exactly the one merge whose split separates it, so both counts
	// are complete when the sort ends; equal values place left-first and
	// are never credited. A position is k-big exactly when both counts
	// reach k.
	n := len(nums)
	leftCounts := make([]int, n)
	rightCounts := make([]int, n)
	order := make([]int, n) // merge-sort workspace of indexes, ordered by value
	for i := range order {
		order[i] = i
	}
	// mergeSort sorts order[lo:hi) by value while filling both tallies:
	// each left-half placement is credited the right-half values already
	// placed below it, and each right-half placement reads its strictly
	// smaller left-half predecessors off the sorted run.
	var mergeSort func(lo, hi int)
	mergeSort = func(lo, hi int) {
		if hi-lo < 2 {
			return
		}
		mid := (lo + hi) / 2
		mergeSort(lo, mid)
		mergeSort(mid, hi)
		left := make([]int, mid-lo)
		copy(left, order[lo:mid])
		i, j, w, s := 0, mid, lo, 0
		for i < len(left) && j < hi {
			if nums[left[i]] <= nums[order[j]] { // equal: the left element places first, uncounted
				rightCounts[left[i]] += j - mid // right-half values already placed below it
				order[w] = left[i]
				i++
			} else {
				for s < len(left) && nums[left[s]] < nums[order[j]] {
					s++
				}
				leftCounts[order[j]] += s // left-half values strictly below it
				order[w] = order[j]
				j++
			}
			w++
		}
		for i < len(left) {
			rightCounts[left[i]] += j - mid // the whole right half sits below it
			order[w] = left[i]
			i++
			w++
		}
		for j < hi {
			for s < len(left) && nums[left[s]] < nums[order[j]] {
				s++
			}
			leftCounts[order[j]] += s
			order[w] = order[j]
			j++
			w++
		}
	}
	mergeSort(0, n)
	big := 0
	for i := range nums {
		if leftCounts[i] >= k && rightCounts[i] >= k {
			big++
		}
	}
	return big
}
