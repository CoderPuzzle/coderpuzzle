// A segment is a maximal run of ones; a new one starts wherever a '1'
// follows a '0'. Bail out as soon as a second starts.
func checkOnesSegment(s string) bool {
	segments := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '1' && (i == 0 || s[i-1] == '0') {
			segments++
			if segments > 1 {
				return false
			}
		}
	}
	return true
}
