import "sort"

// n <= 50, so each window is recounted directly: one count map per window,
// then the distinct values sorted by count descending with the value itself
// breaking ties. Taking the first x of that order keeps every distinct
// value when fewer than x exist, which is exactly the "x-sum is the array
// sum" rule.
func findXSum(nums []int, k int, x int) []int {
	answer := make([]int, 0, len(nums)-k+1)
	for start := 0; start+k <= len(nums); start++ {
		counts := make(map[int]int)
		for i := start; i < start+k; i++ {
			counts[nums[i]]++
		}
		top := make([]int, 0, len(counts))
		for value := range counts {
			top = append(top, value)
		}
		sort.Slice(top, func(a, b int) bool {
			if counts[top[a]] != counts[top[b]] {
				return counts[top[a]] > counts[top[b]]
			}
			return top[a] > top[b]
		})
		// Sums stay within k * 50 = 2500, so int carries everything.
		total := 0
		for i := 0; i < x && i < len(top); i++ {
			total += top[i] * counts[top[i]]
		}
		answer = append(answer, total)
	}
	return answer
}
