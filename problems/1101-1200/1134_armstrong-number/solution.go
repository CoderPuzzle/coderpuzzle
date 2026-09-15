func isArmstrong(n int) bool {
	k := 0
	for m := n; m > 0; m /= 10 {
		k++
	}
	total := 0
	remaining := n
	for remaining > 0 {
		digit := remaining % 10
		power := 1
		for i := 0; i < k; i++ {
			power *= digit
		}
		total += power
		remaining /= 10
	}
	return total == n
}
