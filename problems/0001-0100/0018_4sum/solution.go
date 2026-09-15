import "sort"

func fourSum(nums []int, target int) [][]int {
	// Sort in place: every emitted quadruplet is ascending, and the i-then-j
	// scan emits the quadruplets in lexicographic order.
	sort.Ints(nums)
	n := len(nums)
	result := [][]int{}
	for i := 0; i+3 < n; i++ {
		// Reusing the same value for the first slot would re-find the same
		// triples, so skip runs of equal values.
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		for j := i + 1; j+2 < n; j++ {
			// Same skip one level down, measured against j's own start.
			if j > i+1 && nums[j] == nums[j-1] {
				continue
			}
			left, right := j+1, n-1
			for left < right {
				// int is 64-bit here, so four ±1e9 values cannot overflow it.
				total := nums[i] + nums[j] + nums[left] + nums[right]
				// Below target the sum must grow, so left moves right; above
				// target, right retreats.
				if total < target {
					left++
				} else if total > target {
					right--
				} else {
					result = append(result, []int{nums[i], nums[j], nums[left], nums[right]})
					// Both advance, then run past any runs of equal values, so
					// the same pair is never emitted twice for one (i, j).
					left++
					right--
					for left < right && nums[left] == nums[left-1] {
						left++
					}
					for left < right && nums[right] == nums[right+1] {
						right--
					}
				}
			}
		}
	}
	return result
}
