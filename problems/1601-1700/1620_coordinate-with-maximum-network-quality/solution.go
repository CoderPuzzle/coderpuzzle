import "math"

func bestCoordinate(towers [][]int, radius int) []int {
	bestX, bestY := 0, 0
	bestQuality := -1

	for x := 0; x <= 50; x++ {
		for y := 0; y <= 50; y++ {
			total := 0
			for _, tower := range towers {
				dx := float64(tower[0] - x)
				dy := float64(tower[1] - y)
				d := math.Sqrt(dx*dx + dy*dy)
				if d <= float64(radius) {
					total += int(math.Floor(float64(tower[2]) / (1 + d)))
				}
			}
			if total > bestQuality {
				bestQuality = total
				bestX, bestY = x, y
			}
		}
	}

	return []int{bestX, bestY}
}
