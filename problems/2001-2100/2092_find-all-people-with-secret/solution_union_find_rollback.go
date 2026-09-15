import "sort"

func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
	parent := make([]int, n)
	for person := range parent {
		parent[person] = person
	}
	// Path-halving: splice every other node directly under its
	// grandparent, flattening the tree while walking to the root.
	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	// Moment 0: person 0 hands the whisper to firstPerson, so the two
	// share a component while everybody else is still a singleton.
	parent[0] = firstPerson
	sort.Slice(meetings, func(i, j int) bool { return meetings[i][2] < meetings[j][2] })
	start := 0
	for start < len(meetings) {
		end := start
		for end < len(meetings) && meetings[end][2] == meetings[start][2] {
			ra, rb := find(meetings[end][0]), find(meetings[end][1])
			if ra != rb {
				parent[ra] = rb
			}
			end++
		}

		// Roll back every attendee this moment left uninformed: their
		// merges must not leak the whisper into a later moment.
		root := find(0)
		for index := start; index < end; index++ {
			x, y := meetings[index][0], meetings[index][1]
			if find(x) != root {
				parent[x] = x
			}
			if find(y) != root {
				parent[y] = y
			}
		}
		start = end
	}

	root := find(0)
	answer := make([]int, 0)
	for person := 0; person < n; person++ {
		if find(person) == root {
			answer = append(answer, person)
		}
	}
	return answer
}
