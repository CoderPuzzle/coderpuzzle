func replaceNonCoprimes(nums []int) []int {
	stack := []int{}
	for _, num := range nums {
		current := int64(num)
		// keep absorbing into `current` while it shares a factor with
		// the processed value to its left
		for len(stack) > 0 {
			top := int64(stack[len(stack)-1])
			g := gcd(top, current)
			if g == 1 {
				break
			}
			stack = stack[:len(stack)-1]
			current = top / g * current
		}
		stack = append(stack, int(current))
	}
	return stack
}

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
