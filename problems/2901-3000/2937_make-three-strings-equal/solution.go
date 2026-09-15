// Deletions only ever shorten a string from the right, so the final
// shared string is a prefix of each input — and it must be non-empty.
// Every string is trimmed to the longest common prefix, and each
// deletion is forced, so the operation count is the sum of the three
// overshoot lengths.
func findMinimumOperations(s1 string, s2 string, s3 string) int {
	limit := min(len(s1), len(s2), len(s3))
	common := 0
	for common < limit && s1[common] == s2[common] && s2[common] == s3[common] {
		common++
	}
	if common == 0 {
		return -1
	}
	return len(s1) + len(s2) + len(s3) - 3*common
}
