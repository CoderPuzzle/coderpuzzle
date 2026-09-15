func generateTheString(n int) string {
	out := make([]byte, n)
	for i := range out {
		out[i] = 'a'
	}
	if n%2 == 0 {
		out[n-1] = 'b'
	}
	return string(out)
}
