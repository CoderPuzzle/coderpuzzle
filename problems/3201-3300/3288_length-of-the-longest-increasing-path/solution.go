import "sort"

func maxPathLength(coordinates [][]int, k int) int {
	pivotX, pivotY := coordinates[k][0], coordinates[k][1]
	below := make([][2]int, 0)
	above := make([][2]int, 0)
	for _, point := range coordinates {
		if point[0] < pivotX && point[1] < pivotY {
			below = append(below, [2]int{point[0], point[1]})
		} else if point[0] > pivotX && point[1] > pivotY {
			above = append(above, [2]int{point[0], point[1]})
		}
	}
	return 1 + longestChain(below) + longestChain(above)
}

func longestChain(points [][2]int) int {
	sort.Slice(points, func(i, j int) bool {
		if points[i][0] != points[j][0] {
			return points[i][0] < points[j][0]
		}
		return points[i][1] > points[j][1]
	})
	tails := make([]int, 0, len(points))
	for _, point := range points {
		slot := sort.SearchInts(tails, point[1])
		if slot == len(tails) {
			tails = append(tails, point[1])
		} else {
			tails[slot] = point[1]
		}
	}
	return len(tails)
}
