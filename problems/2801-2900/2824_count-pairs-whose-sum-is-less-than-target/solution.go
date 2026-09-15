import "sort"

func countPairs(nums []int, target int) int {
	// Unordered index pairs are unaffected by order, so sorting a copy is
	// safe. Values lie in [-50, 50], so every pair sum stays inside int.
	sortedNums := append([]int(nil), nums...)
	sort.Ints(sortedNums)
	answer := 0
	lo, hi := 0, len(sortedNums)-1
	for lo < hi {
		if sortedNums[lo]+sortedNums[hi] < target {
			answer += hi - lo
			lo++
		} else {
			hi--
		}
	}
	return answer
}
