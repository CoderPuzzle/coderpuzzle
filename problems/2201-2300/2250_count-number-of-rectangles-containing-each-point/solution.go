import "sort"

func countRectangles(rectangles [][]int, points [][]int) []int {
	byHeight := make([][]int, 101)
	for _, rect := range rectangles {
		l, h := rect[0], rect[1]
		byHeight[h] = append(byHeight[h], l)
	}
	for _, lengths := range byHeight {
		sort.Ints(lengths)
	}

	count := make([]int, len(points))
	for j, point := range points {
		x, y := point[0], point[1]
		total := 0
		for h := y; h <= 100; h++ {
			lengths := byHeight[h]
			idx := sort.Search(len(lengths), func(i int) bool { return lengths[i] >= x })
			total += len(lengths) - idx
		}
		count[j] = total
	}
	return count
}
