func countPoints(rings string) int {
	var masks [10]int
	for index := 0; index < len(rings); index += 2 {
		bit := 4
		if rings[index] == 'R' {
			bit = 1
		} else if rings[index] == 'G' {
			bit = 2
		}
		masks[rings[index+1]-'0'] |= bit
	}
	answer := 0
	for _, mask := range masks {
		if mask == 7 {
			answer++
		}
	}
	return answer
}
