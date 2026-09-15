// An element counts only if it appears exactly once. Values are bounded
// to 1..100, so a fixed frequency table settles every element in one
// pass; a second sweep sums the singletons.
func sumOfUnique(nums []int) int {
	count := [101]int{}
	for _, v := range nums {
		count[v]++
	}
	sum := 0
	for _, v := range nums {
		if count[v] == 1 {
			sum += v
		}
	}
	return sum
}
