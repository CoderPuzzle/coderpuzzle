// target is the remainder the removed subarray's own sum must leave; if
// the whole array already clears it, remove nothing.
func minSubarray(nums []int, p int) int {
	n := len(nums)
	// int is 64-bit here, so the running total stays exact even though
	// values reach 1e9 and the array reaches length 1e5.
	total := 0
	for _, value := range nums {
		total += value
	}
	target := total % p
	if target == 0 {
		return 0
	}

	// Map each running prefix remainder to its most recent index, seeded
	// with the empty prefix (remainder 0 at index -1).
	lastIndex := map[int]int{0: -1}
	running := 0
	best := n
	for index, value := range nums {
		running = (running + value) % p
		needed := ((running-target)%p + p) % p
		if earlier, seen := lastIndex[needed]; seen {
			// A match spanning the full array (earlier == -1 at the last
			// index) would remove everything, which is disallowed — cap
			// the span below n to reject exactly that one case.
			span := index - earlier
			if span < n && span < best {
				best = span
			}
		}
		lastIndex[running] = index
	}

	if best < n {
		return best
	}
	return -1
}
