import "sort"

func smallestDistancePair(nums []int, k int) int {
	nums = append([]int{}, nums...)
	sort.Ints(nums)
	n := len(nums)

	// Pairs within dist, counted on the sorted array with two pointers:
	// j only moves forward across the whole scan (never restarts per i).
	countLe := func(dist int) int {
		cnt := 0
		j := 0
		for i := 0; i < n; i++ {
			for j < n && nums[j]-nums[i] <= dist {
				j++
			}
			// Later elements within dist of nums[i]; j - i - 1 of them.
			cnt += j - i - 1
		}
		return cnt
	}

	// The count is monotone in dist, so binary search the distance itself
	// over [0, max - min]; the converged value is a real pair distance.
	lo, hi := 0, nums[n-1]-nums[0]
	for lo < hi {
		mid := lo + (hi-lo)/2
		// At least k pairs qualify: the kth smallest is mid or smaller.
		if countLe(mid) >= k {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
