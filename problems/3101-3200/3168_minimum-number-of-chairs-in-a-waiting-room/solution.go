func minimumChairs(s string) int {
	people := 0
	chairs := 0
	for i := 0; i < len(s); i++ {
		if s[i] == 'E' {
			people++
			if people > chairs {
				chairs = people
			}
		} else {
			people--
		}
	}
	return chairs
}
