func missingRolls(rolls []int, mean int, n int) []int {
	var observedSum int64
	for _, roll := range rolls {
		observedSum += int64(roll)
	}

	required := int64(mean)*int64(len(rolls)+n) - observedSum
	if required < int64(n) || required > 6*int64(n) {
		return []int{}
	}

	base := int(required / int64(n))
	remainder := int(required % int64(n))
	missing := make([]int, n)
	for i := range missing {
		missing[i] = base
		if i < remainder {
			missing[i]++
		}
	}
	return missing
}
