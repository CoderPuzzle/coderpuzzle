import (
	"sort"
)

func latestTimeCatchTheBus(buses []int, passengers []int, capacity int) int {
	sort.Ints(buses)
	sort.Ints(passengers)
	boarded := 0
	j := 0
	for _, bus := range buses {
		boarded = 0
		for j < len(passengers) && boarded < capacity && passengers[j] <= bus {
			j++
			boarded++
		}
	}
	answer := buses[len(buses)-1]
	if boarded >= capacity {
		answer = passengers[j-1] - 1
	}
	taken := map[int]bool{}
	for _, passenger := range passengers {
		taken[passenger] = true
	}
	for taken[answer] {
		answer--
	}
	return answer
}
