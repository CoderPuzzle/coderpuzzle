func mirrorFrequency(s string) int {
	// 36 counters: 26 letters, then 10 digits.
	freq := make([]int, 36)
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch >= 'a' && ch <= 'z' {
			freq[ch-'a']++
		} else {
			freq[26+ch-'0']++
		}
	}
	total := 0
	// Letters fold into 13 mirror pairs (a,z), (b,y), ..., (m,n).
	for i := 0; i < 13; i++ {
		a := freq[i]
		b := freq[25-i]
		if a+b > 0 {
			if a > b {
				total += a - b
			} else {
				total += b - a
			}
		}
	}
	// Digits fold into 5 mirror pairs (0,9), (1,8), ..., (4,5).
	for d := 0; d < 5; d++ {
		a := freq[26+d]
		b := freq[26+9-d]
		if a+b > 0 {
			if a > b {
				total += a - b
			} else {
				total += b - a
			}
		}
	}
	return total
}
