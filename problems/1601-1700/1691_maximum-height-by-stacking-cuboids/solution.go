import "sort"

func maxHeight(cuboids [][]int) int {
	// Rotations are free, so sort each cuboid's dimensions — largest up is
	// simultaneously tallest and least constrained.
	boxes := make([][]int, len(cuboids))
	for i, c := range cuboids {
		b := append([]int(nil), c...)
		sort.Ints(b)
		boxes[i] = b
	}
	// Lexicographic order puts a potential base before its tippers.
	sort.Slice(boxes, func(a, b int) bool {
		if boxes[a][0] != boxes[b][0] {
			return boxes[a][0] < boxes[b][0]
		}
		if boxes[a][1] != boxes[b][1] {
			return boxes[a][1] < boxes[b][1]
		}
		return boxes[a][2] < boxes[b][2]
	})
	n := len(boxes)
	// dp[i]: tallest stack with cuboid i on top.
	dp := make([]int, n)
	best := 0
	for i := 0; i < n; i++ {
		dp[i] = boxes[i][2]
		// An earlier j whose sorted triple is component-wise <= i's can
		// support it (non-strict: equal dimensions may touch).
		for j := 0; j < i; j++ {
			if boxes[j][0] <= boxes[i][0] && boxes[j][1] <= boxes[i][1] && boxes[j][2] <= boxes[i][2] {
				if dp[j]+boxes[i][2] > dp[i] {
					dp[i] = dp[j] + boxes[i][2]
				}
			}
		}
		if dp[i] > best {
			best = dp[i]
		}
	}
	return best
}
