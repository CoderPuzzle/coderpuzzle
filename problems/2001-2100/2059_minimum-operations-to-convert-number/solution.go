func minimumOperations(nums []int, start int, goal int) int {
	distance := make([]int, 1001)
	for index := range distance {
		distance[index] = -1
	}
	distance[start] = 0
	queue := []int{start}

	for head := 0; head < len(queue); head++ {
		value := queue[head]
		nextDistance := distance[value] + 1
		for _, number := range nums {
			candidates := [3]int{value + number, value - number, value ^ number}
			for _, candidate := range candidates {
				if candidate == goal {
					return nextDistance
				}
				if candidate >= 0 && candidate <= 1000 && distance[candidate] == -1 {
					distance[candidate] = nextDistance
					queue = append(queue, candidate)
				}
			}
		}
	}
	return -1
}
