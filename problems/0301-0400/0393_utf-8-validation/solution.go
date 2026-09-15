// Only the least significant 8 bits of each integer are data, so mask down
// to one byte before reading the leading bits.
func validUtf8(data []int) bool {
	remaining := 0
	for _, value := range data {
		b := value & 0xFF
		if remaining == 0 {
			// The leader's top bits name its class: 0xxxxxxx (1 byte),
			// 110xxxxx (2), 1110xxxx (3), 11110xxx (4); a stray
			// continuation or the undefined 11111xxx is no leader at all.
			switch {
			case b&0xF8 == 0xF0:
				remaining = 3
			case b&0xF0 == 0xE0:
				remaining = 2
			case b&0xE0 == 0xC0:
				remaining = 1
			case b&0x80 != 0x00:
				return false
			}
		} else if b&0xC0 != 0x80 {
			// Every byte a leader owes must be a 10xxxxxx continuation.
			return false
		} else {
			remaining--
		}
	}
	// A leader cut short by the end of the input leaves bytes owed.
	return remaining == 0
}
