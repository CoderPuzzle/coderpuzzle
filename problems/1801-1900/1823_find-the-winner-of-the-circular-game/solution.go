func findTheWinner(n int, k int) int {
	friends := make([]int, n)
	for i := 0; i < n; i++ {
		friends[i] = i + 1
	}
	// idx marks where the next count starts (friend 1 for the first round).
	idx := 0
	for len(friends) > 1 {
		// -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
		idx = (idx + k - 1) % len(friends)
		// The clockwise neighbor shifts into the vacated slot, so idx already
		// points at where the next count must begin — no extra adjustment needed.
		friends = append(friends[:idx], friends[idx+1:]...)
	}
	return friends[0]
}
