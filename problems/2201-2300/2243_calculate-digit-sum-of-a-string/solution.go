import "strconv"

func digitSum(s string, k int) string {
	for len(s) > k {
		next := ""
		for i := 0; i < len(s); i += k {
			end := i + k
			if end > len(s) {
				end = len(s)
			}
			sum := 0
			for j := i; j < end; j++ {
				sum += int(s[j] - '0')
			}
			next += strconv.Itoa(sum)
		}
		s = next
	}
	return s
}
