func isHappy(n int) bool {
	// Sum of the squares of the digits, one digit per iteration.
	step := func(m int) int {
		total := 0
		for m != 0 {
			digit := m % 10
			total += digit * digit
			m /= 10
		}
		return total
	}
	// The step is a fixed function of its input, so the sequence from n is
	// a tail leading into the fixed point 1 or into a cycle that avoids
	// it — a rho shape. Tortoise and hare settle which, with no memory of
	// past values: the hare gains one position per round, so once both
	// runners are on the cycle it must catch the tortoise.
	slow, fast := step(n), step(step(n))
	for slow != fast {
		slow = step(slow)
		fast = step(step(fast))
	}
	// Happy starts park both runners on 1, where they are born equal; an
	// unhappy start meets inside a cycle that never contains 1.
	return slow == 1
}
