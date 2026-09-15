import "strconv"

func punishmentNumber(n int) int {
	total := 0
	for i := 1; i <= n; i++ {
		digits := strconv.Itoa(i * i)
		length := len(digits)
		found := false
		for mask := 0; mask < 1<<(length-1); mask++ {
			sum, cur, pruned := 0, 0, false
			for k := 0; k < length; k++ {
				cur = cur*10 + int(digits[k]-'0')
				if (mask>>k)&1 != 0 {
					sum += cur
					cur = 0
					if sum > i {
						pruned = true
						break
					}
				}
			}
			if !pruned && sum+cur == i {
				found = true
				break
			}
		}
		if found {
			total += i * i
		}
	}
	return total
}
