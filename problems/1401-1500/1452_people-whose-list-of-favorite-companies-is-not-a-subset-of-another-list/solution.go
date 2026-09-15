func peopleIndexes(favoriteCompanies [][]string) []int {
	sets := make([]map[string]bool, len(favoriteCompanies))
	for i, companies := range favoriteCompanies {
		set := make(map[string]bool, len(companies))
		for _, company := range companies {
			set[company] = true
		}
		sets[i] = set
	}
	result := make([]int, 0)
	for i, small := range sets {
		covered := false
		for j, big := range sets {
			if i == j || len(big) <= len(small) {
				continue
			}
			inside := true
			for _, company := range favoriteCompanies[i] {
				if !big[company] {
					inside = false
					break
				}
			}
			if inside {
				covered = true
				break
			}
		}
		if !covered {
			result = append(result, i)
		}
	}
	return result
}
