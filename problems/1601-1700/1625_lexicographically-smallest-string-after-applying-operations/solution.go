func findLexSmallestString(s string, a int, b int) string {
	n := len(s)
	seen := map[string]bool{s: true}
	queue := []string{s}
	best := s

	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		if cur < best {
			best = cur
		}

		digits := []byte(cur)
		for i := 1; i < n; i += 2 {
			value := (int(digits[i]-'0') + a) % 10
			digits[i] = byte('0' + value)
		}
		added := string(digits)
		if !seen[added] {
			seen[added] = true
			queue = append(queue, added)
		}

		rotated := cur[n-b:] + cur[:n-b]
		if !seen[rotated] {
			seen[rotated] = true
			queue = append(queue, rotated)
		}
	}

	return best
}
