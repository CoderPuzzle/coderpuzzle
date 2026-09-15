// ASCII puts every uppercase letter in 65..90 and its lowercase twin 32
// codes higher, so one pass decides each byte: inside the range, add 32;
// outside it, copy untouched. The range check is what keeps the +32 from
// reaching digits, punctuation, or already-lowercase letters.
func toLowerCase(s string) string {
	out := []byte(s)
	for i, c := range out {
		if c >= 'A' && c <= 'Z' {
			out[i] = c + 32
		}
	}
	return string(out)
}
