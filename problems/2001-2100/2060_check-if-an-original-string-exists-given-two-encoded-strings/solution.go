type encodedState struct {
	i, j, difference int
}

func possiblyEquals(s1 string, s2 string) bool {
	memo := make(map[encodedState]bool)
	seen := make(map[encodedState]bool)
	var search func(int, int, int) bool
	search = func(i, j, difference int) bool {
		state := encodedState{i, j, difference}
		if seen[state] {
			return memo[state]
		}
		if i == len(s1) && j == len(s2) {
			return difference == 0
		}

		if i < len(s1) && isEncodedDigit(s1[i]) {
			value := 0
			for end := i; end < len(s1) && end < i+3 && isEncodedDigit(s1[end]); end++ {
				value = value*10 + int(s1[end]-'0')
				if search(end+1, j, difference+value) {
					seen[state], memo[state] = true, true
					return true
				}
			}
		}

		if j < len(s2) && isEncodedDigit(s2[j]) {
			value := 0
			for end := j; end < len(s2) && end < j+3 && isEncodedDigit(s2[end]); end++ {
				value = value*10 + int(s2[end]-'0')
				if search(i, end+1, difference-value) {
					seen[state], memo[state] = true, true
					return true
				}
			}
		}

		answer := false
		if difference > 0 && j < len(s2) && !isEncodedDigit(s2[j]) {
			answer = search(i, j+1, difference-1)
		} else if difference < 0 && i < len(s1) && !isEncodedDigit(s1[i]) {
			answer = search(i+1, j, difference+1)
		} else if difference == 0 && i < len(s1) && j < len(s2) && !isEncodedDigit(s1[i]) && !isEncodedDigit(s2[j]) && s1[i] == s2[j] {
			answer = search(i+1, j+1, 0)
		}
		seen[state], memo[state] = true, answer
		return answer
	}
	return search(0, 0, 0)
}

func isEncodedDigit(character byte) bool {
	return character >= '0' && character <= '9'
}
