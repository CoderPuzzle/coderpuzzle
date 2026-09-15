import "sort"

func minOperations(nums []int, numsDivide []int) int {
	// An element x can head nums only if it divides every value in
	// numsDivide; one common divisor divides their GCD, so reduce the
	// target once and count the sorted elements below the smallest
	// divisor of it.
	g := 0
	for _, value := range numsDivide {
		g = gcd(g, value)
	}
	sort.Ints(nums)
	deletions := 0
	for _, value := range nums {
		if g%value == 0 {
			return deletions
		}
		deletions++
	}
	return -1
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
