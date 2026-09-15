func minimumNumbers(num int, k int) int {
	if num == 0 {
		return 0
	}
	base := k
	if k == 0 {
		base = 10
	}
	for count := 1; count*base <= num; count++ {
		if (num-count*base)%10 == 0 {
			return count
		}
	}
	return -1
}
