import "sort"

func brightestPosition(lights [][]int) int {
	events := make(map[int]int)
	for _, light := range lights {
		events[light[0]-light[1]]++
		events[light[0]+light[1]+1]--
	}

	coordinates := make([]int, 0, len(events))
	for coordinate := range events {
		coordinates = append(coordinates, coordinate)
	}
	sort.Ints(coordinates)
	brightness := 0
	bestBrightness := 0
	answer := 0
	for _, coordinate := range coordinates {
		brightness += events[coordinate]
		if brightness > bestBrightness {
			bestBrightness = brightness
			answer = coordinate
		}
	}
	return answer
}
