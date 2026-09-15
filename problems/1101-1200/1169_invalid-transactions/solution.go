import "strconv"

func invalidTransactions(transactions []string) []string {
	n := len(transactions)
	parsed := make([][4]string, n)
	for i, t := range transactions {
		start, slot := 0, 0
		for k := 0; k <= len(t); k++ {
			if k == len(t) || t[k] == ',' {
				parsed[i][slot] = t[start:k]
				slot++
				start = k + 1
			}
		}
	}
	flags := make([]bool, n)
	// An amount over the limit convicts on its own; otherwise the
	// transaction waits for a same-name partner in another city within
	// 60 minutes — which may appear anywhere in the array.
	for i := 0; i < n; i++ {
		timeI, _ := strconv.Atoi(parsed[i][1])
		if amount, _ := strconv.Atoi(parsed[i][2]); amount > 1000 {
			flags[i] = true
			continue
		}
		for j := 0; j < n; j++ {
			if i == j || parsed[j][0] != parsed[i][0] || parsed[j][3] == parsed[i][3] {
				continue
			}
			timeJ, _ := strconv.Atoi(parsed[j][1])
			if abs(timeI-timeJ) <= 60 {
				flags[i] = true
				break
			}
		}
	}
	invalid := []string{}
	for i := 0; i < n; i++ {
		if flags[i] {
			invalid = append(invalid, transactions[i])
		}
	}
	return invalid
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
