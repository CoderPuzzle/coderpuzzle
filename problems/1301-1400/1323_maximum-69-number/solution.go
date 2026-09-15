import "strconv"
import "strings"

func maximum69Number(num int) int {
	// The leftmost 6 carries the most weight, so flipping it is the one best
	// change; no 6 at all means the number is already maximal.
	text := strconv.Itoa(num)
	if at := strings.IndexByte(text, '6'); at >= 0 {
		text = text[:at] + "9" + text[at+1:]
	}
	result, _ := strconv.Atoi(text)
	return result
}
