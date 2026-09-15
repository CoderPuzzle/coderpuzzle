func equalCountSubstrings(s string, count int) int {
	answer := 0
	for distinct := 1; distinct <= 26; distinct++ {
		windowLength := distinct * count
		if windowLength > len(s) {
			break
		}
		frequencies := [26]int{}
		present, exact := 0, 0

		for right := 0; right < len(s); right++ {
			index := int(s[right] - 'a')
			if frequencies[index] == 0 {
				present++
			}
			if frequencies[index] == count {
				exact--
			}
			frequencies[index]++
			if frequencies[index] == count {
				exact++
			}

			if right >= windowLength {
				index = int(s[right-windowLength] - 'a')
				if frequencies[index] == count {
					exact--
				}
				frequencies[index]--
				if frequencies[index] == count {
					exact++
				}
				if frequencies[index] == 0 {
					present--
				}
			}
			if right+1 >= windowLength && present == distinct && exact == distinct {
				answer++
			}
		}
	}
	return answer
}
