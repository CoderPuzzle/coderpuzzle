// Every index has exactly one successor, so each walk either closes a loop
// or dies; 0 unseen, 1 on the current walk, 2 proven dead. Walked nodes are
// retired afterwards, so no index is walked twice overall.
func circularArrayLoop(nums []int) bool {
	n := len(nums)
	state := make([]int, n)
	for start := 0; start < n; start++ {
		if state[start] != 0 {
			continue
		}
		path := []int{}
		node := start
		for state[node] == 0 {
			state[node] = 1
			path = append(path, node)
			next := ((node+nums[node])%n + n) % n
			// A legal loop keeps one direction and more than one node, so
			// a sign flip or a hop back to self kills this chain.
			if nums[next]*nums[node] < 0 || next == node {
				break
			}
			node = next
			if state[node] == 1 {
				return true
			}
		}
		for _, walked := range path {
			state[walked] = 2
		}
	}
	return false
}
