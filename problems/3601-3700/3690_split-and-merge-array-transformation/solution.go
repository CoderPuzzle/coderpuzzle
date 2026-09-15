import "fmt"

func minSplitMerge(nums1 []int, nums2 []int) int {
	// Every operation costs exactly one layer, so breadth-first search from
	// nums1 reaches nums2 along a shortest operation sequence; the whole
	// state space holds at most n! <= 720 arrays. Slices are not comparable
	// map keys, so states are keyed by their fmt.Sprint rendering.
	start := fmt.Sprint(nums1)
	goal := fmt.Sprint(nums2)
	if start == goal {
		return 0
	}
	n := len(nums1)
	seen := map[string]bool{start: true}
	queue := [][]int{nums1}
	steps := 0
	for len(queue) > 0 {
		steps++
		var next [][]int
		for _, state := range queue {
			// Cut every subarray [l..r] (single elements included) and paste
			// it at every slot of the remainder.
			for l := 0; l < n; l++ {
				for r := l; r < n; r++ {
					rest := append(append([]int{}, state[:l]...), state[r+1:]...)
					piece := append([]int{}, state[l:r+1]...)
					for i := 0; i <= len(rest); i++ {
						candidate := make([]int, 0, n)
						candidate = append(candidate, rest[:i]...)
						candidate = append(candidate, piece...)
						candidate = append(candidate, rest[i:]...)
						key := fmt.Sprint(candidate)
						if key == goal {
							return steps
						}
						if !seen[key] {
							seen[key] = true
							next = append(next, candidate)
						}
					}
				}
			}
		}
		queue = next
	}
	return -1 // unreachable: nums2 is guaranteed to be a permutation
}
