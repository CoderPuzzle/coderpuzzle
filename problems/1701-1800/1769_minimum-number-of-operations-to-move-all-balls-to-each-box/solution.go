// One ball hop between adjacent boxes costs 1, so gathering into box i
// costs sum |i - j| over boxes j holding a ball. Sweeping left to
// right, moving the gather point from i-1 to i adds one step per ball
// at or left of i — so carry (count, ops) forward.
func minOperations(boxes string) []int {
	n := len(boxes)
	answer := make([]int, n)
	count, ops := 0, 0
	for i := 0; i < n; i++ {
		answer[i] += ops
		if boxes[i] == '1' {
			count++
		}
		ops += count
	}
	count, ops = 0, 0
	for i := n - 1; i >= 0; i-- {
		answer[i] += ops
		if boxes[i] == '1' {
			count++
		}
		ops += count
	}
	return answer
}
