func canConvert(str1 string, str2 string) bool {
	if str1 == str2 {
		// Zero conversions needed; cycles in the mapping never fire.
		return true
	}
	mapping := [26]int{}
	for i := range mapping {
		mapping[i] = -1
	}
	target := [26]bool{}
	for i := 0; i < len(str1); i++ {
		a := int(str1[i] - 'a')
		b := int(str2[i] - 'a')
		if mapping[a] != -1 && mapping[a] != b {
			// One source letter would need two different targets.
			return false
		}
		mapping[a] = b
		target[b] = true
	}
	// A cycle needs a spare letter to break it, and a spare is any letter
	// that never appears as a target.
	used := 0
	for _, t := range target {
		if t {
			used++
		}
	}
	return used < 26
}
