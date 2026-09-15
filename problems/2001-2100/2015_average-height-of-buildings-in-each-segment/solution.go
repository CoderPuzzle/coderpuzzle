import "sort"

func averageHeightOfBuildings(buildings [][]int) [][]int {
	events := make(map[int][2]int64)
	for _, building := range buildings {
		start := events[building[0]]
		start[0] += int64(building[2])
		start[1]++
		events[building[0]] = start
		end := events[building[1]]
		end[0] -= int64(building[2])
		end[1]--
		events[building[1]] = end
	}

	coordinates := make([]int, 0, len(events))
	for coordinate := range events {
		coordinates = append(coordinates, coordinate)
	}
	sort.Ints(coordinates)
	street := make([][]int, 0)
	var heightSum int64
	var count int64
	for index := 0; index+1 < len(coordinates); index++ {
		left := coordinates[index]
		event := events[left]
		heightSum += event[0]
		count += event[1]
		right := coordinates[index+1]
		if count == 0 {
			continue
		}
		average := int(heightSum / count)
		if len(street) > 0 && street[len(street)-1][1] == left && street[len(street)-1][2] == average {
			street[len(street)-1][1] = right
		} else {
			street = append(street, []int{left, right, average})
		}
	}
	return street
}
