import "strings"

// Four dotted decimal parts, or eight colon-separated hex groups: the
// separator count is the first gate, and it settles queries that mix both
// separators on sight — a valid address of either kind can never contain
// the other kind's separator.
func validIPAddress(queryIP string) string {
	parts := strings.Split(queryIP, ".")
	if len(parts) == 4 && allIPv4(parts) {
		return "IPv4"
	}
	parts = strings.Split(queryIP, ":")
	if len(parts) == 8 && allIPv6(parts) {
		return "IPv6"
	}
	return "Neither"
}

// 1-3 pure digits, no leading zero ("0" alone is the one way to write
// zero), and a value of at most 255.
func allIPv4(parts []string) bool {
	for _, part := range parts {
		if len(part) < 1 || len(part) > 3 {
			return false
		}
		value := 0
		for i := 0; i < len(part); i++ {
			ch := part[i]
			if ch < '0' || ch > '9' {
				return false
			}
			value = value*10 + int(ch-'0')
		}
		if value > 255 {
			return false
		}
		if len(part) > 1 && part[0] == '0' {
			return false
		}
	}
	return true
}

// 1-4 characters of hex, either case; leading zeros are allowed.
func allIPv6(parts []string) bool {
	for _, part := range parts {
		if len(part) < 1 || len(part) > 4 {
			return false
		}
		for i := 0; i < len(part); i++ {
			ch := part[i]
			isHex := (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F')
			if !isHex {
				return false
			}
		}
	}
	return true
}
