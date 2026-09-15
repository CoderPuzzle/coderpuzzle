// score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay as
// running counters — ones on the right is total_ones minus the ones
// already passed — so each of the n + 1 division points costs O(1). The
// sweep emits indices ascending.
func maxScoreIndices(nums []int) []int {
	totalOnes := 0
	for _, value := range nums {
		totalOnes += value
	}
	onesLeft := 0
	zerosLeft := 0
	best := -1
	var answer []int
	for i := 0; i <= len(nums); i++ {
		score := zerosLeft + totalOnes - onesLeft
		if score > best {
			best = score
			answer = []int{i}
		} else if score == best {
			answer = append(answer, i)
		}
		if i < len(nums) {
			if nums[i] == 1 {
				onesLeft++
			} else {
				zerosLeft++
			}
		}
	}
	return answer
}
