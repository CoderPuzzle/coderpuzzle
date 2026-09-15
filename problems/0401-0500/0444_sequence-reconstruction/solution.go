// Consecutive elements of a sequence pin an adjacency: every shortest
// supersequence is a permutation of [1, n] keeping each such pair in order, so
// nums is the unique one exactly when the pinned pairs chain all of nums
// together in nums's own order.
func sequenceReconstruction(nums []int, sequences [][]int) bool {
	n := len(nums)
	pos := make([]int, n+1)
	for i, x := range nums {
		pos[x] = i
	}
	// covered[i] is set once some sequence places nums[i+1] directly after
	// nums[i]; with n == 1 there is nothing to pin.
	covered := make([]bool, n-1)
	for _, seq := range sequences {
		for _, x := range seq {
			// A value outside [1, n] cannot occur in nums at all, so nums is
			// not even a supersequence.
			if x < 1 || x > n {
				return false
			}
		}
		for j := 0; j+1 < len(seq); j++ {
			u, v := pos[seq[j]], pos[seq[j+1]]
			// A pair running backwards in nums means its sequence never embeds
			// in nums.
			if u >= v {
				return false
			}
			if v == u+1 {
				covered[u] = true
			}
		}
	}
	// An unpinned adjacency could be flipped into another permutation of the
	// same length, so uniqueness needs every slot pinned.
	for _, pinned := range covered {
		if !pinned {
			return false
		}
	}
	return true
}
