import "strings"

func largestEven(s string) string {
	// An even result must end in '2', and a longer number of these digits
	// always beats a shorter one, so the best keeps every character up
	// through the last '2' and sheds the odd tail.
	if i := strings.LastIndexByte(s, '2'); i >= 0 {
		return s[:i+1]
	}
	return ""
}
