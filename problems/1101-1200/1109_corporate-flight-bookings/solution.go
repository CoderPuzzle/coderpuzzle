func corpFlightBookings(bookings [][]int, n int) []int {
	// difference array (n + 1 slots keeps the stamp at index last in
	// bounds when last == n): each booking costs two writes instead of
	// touching every flight in [first, last]
	diff := make([]int, n+1)
	for _, b := range bookings {
		diff[b[0]-1] += b[2]
		// -seats one slot past the range end, so flight `last` still
		// sees the seats and every later flight does not
		diff[b[1]] -= b[2]
	}
	// one prefix sum over the stamps: each +/- pair cancels exactly
	// beyond its range, so the running total is each flight's occupancy
	answer := make([]int, 0, n)
	running := 0
	for i := 0; i < n; i++ {
		running += diff[i]
		answer = append(answer, running)
	}
	return answer
}
