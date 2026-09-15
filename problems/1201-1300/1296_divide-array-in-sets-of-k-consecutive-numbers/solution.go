import "sort"

func isPossibleDivide(nums []int, k int) bool {
	// size-k sets can partition the array only if k divides n
	if len(nums)%k != 0 {
		return false
	}
	counts := make(map[int]int)
	for _, x := range nums {
		counts[x]++
	}
	values := make([]int, 0, len(counts))
	for v := range counts {
		values = append(values, v)
	}
	// walk distinct values smallest-first: the smallest remaining value
	// forces its run — every set containing it is exactly v..v+k-1
	sort.Ints(values)
	for _, value := range values {
		need := counts[value]
		// already fully consumed by runs started below
		if need <= 0 {
			continue
		}
		// each of the need copies of value starts its own run; any of the
		// next k values falling short means no valid division exists
		for i := value; i < value+k; i++ {
			if counts[i] < need {
				return false
			}
			counts[i] -= need
		}
	}
	return true
}
