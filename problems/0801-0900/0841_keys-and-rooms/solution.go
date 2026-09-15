// Rooms are nodes and keys are one-way edges, so the rooms that can ever be
// entered are exactly those reachable from room 0. An explicit stack floods
// the key graph; the answer compares marked rooms to n.
func canVisitAllRooms(rooms [][]int) bool {
	seen := make([]bool, len(rooms))
	seen[0] = true
	stack := []int{0}
	visited := 1
	for len(stack) > 0 {
		room := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, key := range rooms[room] {
			if seen[key] {
				continue
			}
			seen[key] = true
			visited++
			stack = append(stack, key)
		}
	}
	return visited == len(rooms)
}
