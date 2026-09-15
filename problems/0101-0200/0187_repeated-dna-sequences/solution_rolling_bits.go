import "sort"

var letterBits = map[byte]byte{
	'A': 0,
	'C': 1,
	'G': 2,
	'T': 3,
}

func findRepeatedDnaSequences(s string) []string {
	seen := make(map[uint32]bool)
	// A second set collects each repeated window exactly once, even when it
	// occurs three or more times.
	repeated := make(map[uint32]bool)
	// 20-bit register: ten letters times two bits each. The oldest letter
	// slides out as the new one slides in.
	var code uint32
	for i := 0; i < len(s); i++ {
		code = ((code << 2) | uint32(letterBits[s[i]])) & 0xFFFFF
		// Fewer than ten letters seen: no full window yet.
		if i >= 9 {
			if seen[code] {
				// Already seen: this window occurs at least twice.
				repeated[code] = true
			} else {
				seen[code] = true
			}
		}
	}
	// Decode the surviving codes back into letters.
	result := make([]string, 0, len(repeated))
	for value := range repeated {
		letters := make([]byte, 10)
		bits := value
		for k := 9; k >= 0; k-- {
			letters[k] = "ACGT"[bits&3]
			bits >>= 2
		}
		result = append(result, string(letters))
	}
	// Sorted output for a deterministic order.
	sort.Strings(result)
	return result
}
