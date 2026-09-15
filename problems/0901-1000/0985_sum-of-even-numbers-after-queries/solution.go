// Every query rewrites exactly one element, so the even sum can only change
// through that element: carry it as a running total — subtract the old value
// when it is even, apply the addition, add the new value when it is even —
// and record the total once per query.
func sumEvenAfterQueries(nums []int, queries [][]int) []int {
	running := 0
	for _, value := range nums {
		if value%2 == 0 {
			running += value
		}
	}
	answer := make([]int, len(queries))
	for queryIndex, query := range queries {
		old := nums[query[1]]
		// the old value leaves the total before the addition lands, so a
		// value that flips parity is never counted on both sides
		if old%2 == 0 {
			running -= old
		}
		updated := old + query[0]
		nums[query[1]] = updated
		// % 2 == 0 is the sign-safe evenness test: -2 passes it whatever
		// remainder -3 % 2 yields
		if updated%2 == 0 {
			running += updated
		}
		answer[queryIndex] = running
	}
	return answer
}
