import "sort"

func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
	sort.Slice(meetings, func(i, j int) bool { return meetings[i][2] < meetings[j][2] })
	knows := make([]bool, n)
	knows[0] = true
	knows[firstPerson] = true
	start := 0
	for start < len(meetings) {
		end := start
		graph := make(map[int][]int)
		for end < len(meetings) && meetings[end][2] == meetings[start][2] {
			x, y := meetings[end][0], meetings[end][1]
			graph[x] = append(graph[x], y)
			graph[y] = append(graph[y], x)
			end++
		}

		queue := make([]int, 0)
		for person := range graph {
			if knows[person] {
				queue = append(queue, person)
			}
		}
		for head := 0; head < len(queue); head++ {
			for _, other := range graph[queue[head]] {
				if !knows[other] {
					knows[other] = true
					queue = append(queue, other)
				}
			}
		}
		start = end
	}

	answer := make([]int, 0)
	for person, informed := range knows {
		if informed {
			answer = append(answer, person)
		}
	}
	return answer
}
