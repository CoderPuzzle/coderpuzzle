import "sort"

func minimumAddedInteger(nums1 []int, nums2 []int) int {
	// Sorted correspondence forces x = min(nums2) - keptMin, and two
	// removals leave the kept minimum at sorted index <= 2, so only the
	// three candidates nums2min - sorted(nums1)[r] for r in {0,1,2} can
	// work. Each candidate is validated by consuming a count of nums1
	// against every nums2 element minus x; the smallest survivor wins.
	sa := append([]int(nil), nums1...)
	sort.Ints(sa)
	loB := nums2[0]
	for _, v := range nums2 {
		if v < loB {
			loB = v
		}
	}
	best := 1 << 30
	for r := 0; r < 3; r++ {
		x := loB - sa[r]
		pool := map[int]int{}
		for _, v := range nums1 {
			pool[v]++
		}
		ok := true
		for _, v := range nums2 {
			need := v - x
			if pool[need] == 0 {
				ok = false
				break
			}
			pool[need]--
		}
		if ok && x < best {
			best = x
		}
	}
	return best
}
