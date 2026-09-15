import "strings"

// Both rules only shuffle zeros: "10" -> "01" slides a zero one seat
// left, and "00" -> "10" fuses an adjacent pair into their right seat.
// Herding all z zeros into the first one (index first) parks the
// survivor at first + z - 1 with '1' everywhere else; with at most one
// zero no move can improve the string.
func maximumBinaryString(binary string) string {
	zeros := strings.Count(binary, "0")
	if zeros <= 1 {
		return binary
	}
	seat := strings.IndexByte(binary, '0') + zeros - 1
	return strings.Repeat("1", seat) + "0" + strings.Repeat("1", len(binary)-seat-1)
}
