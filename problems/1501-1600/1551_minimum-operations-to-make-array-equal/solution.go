func minOperations(n int) int {
	m := int64(n)
	return int((m * m) / 4)
}
