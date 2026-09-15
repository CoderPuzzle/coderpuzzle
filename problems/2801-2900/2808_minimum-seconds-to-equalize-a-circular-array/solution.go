func minimumSeconds(nums []int) int {
	firstSeen := map[int]int{}
	lastSeen := map[int]int{}
	maxForwardGap := map[int]int{}
	for i, num := range nums {
		if _, ok := firstSeen[num]; ok {
			if gap := i - lastSeen[num]; gap > maxForwardGap[num] {
				maxForwardGap[num] = gap
			}
		} else {
			firstSeen[num] = i
			maxForwardGap[num] = 0
		}
		lastSeen[num] = i
	}
	n := len(nums)
	answer := n
	for num, start := range firstSeen {
		gap := n - lastSeen[num] + start
		if maxForwardGap[num] > gap {
			gap = maxForwardGap[num]
		}
		if half := gap / 2; half < answer {
			answer = half
		}
	}
	return answer
}
