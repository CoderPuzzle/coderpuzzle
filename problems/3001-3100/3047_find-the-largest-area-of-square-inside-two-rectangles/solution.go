func largestSquareArea(bottomLeft [][]int, topRight [][]int) int64 {
	best := int64(0)
	n := len(bottomLeft)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			width := minInt(topRight[i][0], topRight[j][0]) -
				maxInt(bottomLeft[i][0], bottomLeft[j][0])
			height := minInt(topRight[i][1], topRight[j][1]) -
				maxInt(bottomLeft[i][1], bottomLeft[j][1])
			if width > 0 && height > 0 {
				side := width
				if height < side {
					side = height
				}
				area := int64(side) * int64(side)
				if area > best {
					best = area
				}
			}
		}
	}
	return best
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}
