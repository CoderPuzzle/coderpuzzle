func sumOfTheDigitsOfHarshadNumber(x int) int {
	// Extract digits by repeated division (hint 1), then the definition
	// itself finishes the job: x is a Harshad number exactly when its digit
	// sum divides it. With x <= 100 there are at most three digits and
	// every intermediate fits comfortably in machine integers.
	total := 0
	for remaining := x; remaining > 0; remaining /= 10 {
		total += remaining % 10
	}
	if x%total == 0 {
		return total
	}
	return -1
}
