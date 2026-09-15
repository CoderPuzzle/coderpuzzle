// prev holds the distinct AND-values of every subarray ending at the
// previous index. AND only clears bits, so this set stays small
// (O(log(max(arr))) entries) and updates cheaply from one index to the next.
func closestToTarget(arr []int, target int) int {
	abs := func(x int) int {
		if x < 0 {
			return -x
		}
		return x
	}

	best := abs(arr[0] - target)
	prev := map[int]bool{arr[0]: true}
	for _, value := range arr[1:] {
		cur := map[int]bool{value: true}
		for p := range prev {
			cur[p&value] = true
		}
		for v := range cur {
			if d := abs(v - target); d < best {
				best = d
			}
		}
		prev = cur
	}
	return best
}
