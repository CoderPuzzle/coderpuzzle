func restoreIpAddresses(s string) []string {
	// Non-nil empty so an address-free result serializes as [].
	addresses := []string{}
	segments := make([]string, 0, 4)
	var cut func(start int)
	cut = func(start int) {
		remaining := 4 - len(segments)
		// What is left must feed 1-3 digits to every remaining segment; at
		// zero segments left this accepts only a fully consumed string.
		if remaining > len(s)-start || len(s)-start > 3*remaining {
			return
		}
		if remaining == 0 {
			addresses = append(addresses, segments[0]+"."+segments[1]+"."+segments[2]+"."+segments[3])
			return
		}
		// Shorter cuts first: a dot sorts before any digit, so the output
		// lands in ascending lexicographic order.
		for length := 1; length <= 3; length++ {
			if start+length > len(s) {
				break
			}
			part := s[start : start+length]
			// A segment is 0-255 with no leading zero unless it is exactly "0".
			if len(part) > 1 && part[0] == '0' {
				continue
			}
			value := 0
			for i := 0; i < len(part); i++ {
				value = value*10 + int(part[i]-'0')
			}
			if value > 255 {
				continue
			}
			segments = append(segments, part)
			cut(start + length)
			segments = segments[:len(segments)-1]
		}
	}
	cut(0)
	return addresses
}
