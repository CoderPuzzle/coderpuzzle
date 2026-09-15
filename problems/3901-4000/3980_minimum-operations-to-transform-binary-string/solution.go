func minOperations(s1 string, s2 string) int {
	selectedEdges := 0
	coveredByPrevious := false
	onesDifference := 0

	for i := range s1 {
		if s2[i] == '1' {
			onesDifference++
		}
		if s1[i] == '1' {
			onesDifference--
		}

		needsPair := s1[i] == '1' && s2[i] == '0'
		if needsPair && !coveredByPrevious {
			if len(s1) == 1 {
				return -1
			}
			selectedEdges++
			coveredByPrevious = i+1 < len(s1)
		} else {
			coveredByPrevious = false
		}
	}

	return onesDifference + 3*selectedEdges
}
