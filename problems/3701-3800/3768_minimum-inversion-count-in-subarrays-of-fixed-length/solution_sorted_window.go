import "sort"

func minInversionCount(nums []int, k int) int64 {
	// Keep the current window as a sorted slice. A sorted slice makes the
	// slide's two rank questions direct binary searches: the position an
	// element occupies IS the number of elements smaller than it, and the
	// gap it is dropped into counts the elements greater than it. The
	// running inversion count moves by the same two terms the Fenwick tree
	// tracks, but each term is read off one bisection — no tree, no
	// compression, and the window itself stays materialized. The trade is
	// the O(k) element shift per insert and delete; with k up to n that is
	// quadratic in the worst case but so cache-friendly that mid-size
	// windows stay fast.
	//
	// Equal values need care at both ends: removing uses the leftmost
	// matching position so exactly one copy leaves, inserting uses the
	// rightmost so the newcomer lands after its equals and only pairs with
	// strictly larger survivors.
	window := make([]int, 0, k)
	var inversions int64
	for i := 0; i < k; i++ {
		pos := sort.SearchInts(window, nums[i])
		if pos < len(window) && window[pos] == nums[i] {
			pos++
			for pos < len(window) && window[pos] == nums[i] {
				pos++
			}
		}
		inversions += int64(len(window) - pos)
		window = append(window, 0)
		copy(window[pos+1:], window[pos:])
		window[pos] = nums[i]
	}
	best := inversions
	for right := k; right < len(nums); right++ {
		outPos := sort.SearchInts(window, nums[right-k])
		inversions -= int64(outPos)
		copy(window[outPos:], window[outPos+1:])
		window = window[:len(window)-1]
		inPos := len(window)
		for inPos > 0 && window[inPos-1] > nums[right] {
			inPos--
		}
		inversions += int64(len(window) - inPos)
		window = append(window, 0)
		copy(window[inPos+1:], window[inPos:])
		window[inPos] = nums[right]
		if inversions < best {
			best = inversions
		}
	}
	return best
}
