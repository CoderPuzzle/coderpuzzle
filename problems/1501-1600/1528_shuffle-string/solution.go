// indices[i] names s[i]'s destination outright, so just write each byte
// straight into its final slot.
func restoreString(s string, indices []int) string {
	result := make([]byte, len(s))
	for i := 0; i < len(s); i++ {
		result[indices[i]] = s[i]
	}
	return string(result)
}
