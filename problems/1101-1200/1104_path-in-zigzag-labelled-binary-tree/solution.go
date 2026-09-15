// Walk up level by level using each node's position within its row. The
// parent of the node at position p sits at position p / 2 in the row above,
// in every row; only the label-to-position mapping flips direction between
// rows. Fill the result from the back so the path comes out root-first
// without a separate reverse.
func pathInZigZagTree(label int) []int {
	level := 0
	for v := label; v > 1; v >>= 1 {
		level++
	}
	result := make([]int, level+1)
	cur := label
	for i := level; i >= 0; i-- {
		result[i] = cur
		if i == 0 {
			break
		}
		low := 1 << i
		high := (1 << (i + 1)) - 1
		position := cur - low
		if i%2 == 1 {
			position = high - cur
		}
		parentPosition := position / 2
		low = 1 << (i - 1)
		high = (1 << i) - 1
		cur = low + parentPosition
		if (i-1)%2 == 1 {
			cur = high - parentPosition
		}
	}
	return result
}
