import "sort"

func minAbsDifference(nums []int, goal int) int {
	subsetSums := func(arr []int) []int {
		// Doubling: each value extends the list with a shifted copy of
		// itself, turning t sums into 2t (0 included — empty set covered).
		sums := make([]int, 1, 1<<len(arr))
		sums[0] = 0
		for _, value := range arr {
			size := len(sums)
			for j := 0; j < size; j++ {
				sums = append(sums, sums[j]+value)
			}
		}
		return sums
	}

	// Meet in the middle: 2^40 is hopeless, but two halves of <= 20
	// elements enumerate ~10^6 sums each, and every subsequence sum is
	// sL + sR with one part from each side.
	half := len(nums) / 2
	left := subsetSums(nums[:half])
	right := subsetSums(nums[half:])
	sort.Ints(left)
	best := -1
	for _, s := range right {
		// The best partner is the left sum nearest goal - s; anything
		// other than the floor and ceiling around the insertion point
		// lies strictly farther away.
		need := goal - s
		idx := sort.SearchInts(left, need)
		for _, j := range []int{idx - 1, idx} {
			if j >= 0 && j < len(left) {
				diff := left[j] + s - goal
				if diff < 0 {
					diff = -diff
				}
				if best == -1 || diff < best {
					best = diff
				}
			}
		}
	}
	return best
}
