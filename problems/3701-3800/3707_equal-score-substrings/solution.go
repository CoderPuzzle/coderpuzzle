func scoreBalance(s string) bool {
	// The total letter score lets every split compare a running prefix
	// against the remainder: the halves balance exactly when the running
	// score reaches half the total.
	total := 0
	for _, ch := range s {
		total += int(ch-'a') + 1
	}
	left := 0
	// Sweep the split points, growing the left side one letter at a time;
	// stopping before the final character keeps both halves non-empty.
	for i := 0; i+1 < len(s); i++ {
		left += int(s[i]-'a') + 1
		if 2*left == total {
			return true
		}
	}
	return false
}
