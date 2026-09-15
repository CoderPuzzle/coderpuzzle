func addPoly(poly1 [][]int, poly2 [][]int) [][]int {
	result := [][]int{}
	i, j := 0, 0
	for i < len(poly1) && j < len(poly2) {
		power1, power2 := poly1[i][0], poly2[j][0]
		if power1 == power2 {
			coefficient := poly1[i][1] + poly2[j][1]
			if coefficient != 0 {
				result = append(result, []int{power1, coefficient})
			}
			i++
			j++
		} else if power1 > power2 {
			result = append(result, poly1[i])
			i++
		} else {
			result = append(result, poly2[j])
			j++
		}
	}
	for i < len(poly1) {
		result = append(result, poly1[i])
		i++
	}
	for j < len(poly2) {
		result = append(result, poly2[j])
		j++
	}
	return result
}
