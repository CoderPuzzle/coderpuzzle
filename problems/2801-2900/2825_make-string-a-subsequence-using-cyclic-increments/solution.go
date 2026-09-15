func canMakeSubsequence(str1 string, str2 string) bool {
	// Walk str1 once with a pointer into str2. Whenever str2[j] equals
	// str1[i], or equals its cyclic successor, take the pair and advance
	// both pointers: claiming the earliest eligible slot never displaces
	// a better later choice, because everything that fits after it also
	// fits after any other valid pick. Matching all of str2 this way is
	// exactly what was asked for.
	j := 0
	for i := 0; i < len(str1); i++ {
		if j < len(str2) {
			d := (int(str2[j]) - int(str1[i]) + 26) % 26
			if d <= 1 {
				j++
			}
		}
	}
	return j == len(str2)
}
