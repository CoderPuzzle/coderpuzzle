func findMinFibonacciNumbers(k int) int {
	fibs := []int{1, 1}
	for fibs[len(fibs)-1]+fibs[len(fibs)-2] <= k {
		fibs = append(fibs, fibs[len(fibs)-1]+fibs[len(fibs)-2])
	}
	// Zeckendorf: greedily taking the largest F <= k never lands on two
	// consecutive Fibonacci numbers, so this builds the unique minimal
	// (non-consecutive) representation term by term
	count := 0
	remaining := k
	index := len(fibs) - 1
	for remaining > 0 {
		for fibs[index] > remaining {
			index--
		}
		remaining -= fibs[index]
		count++
	}
	return count
}
