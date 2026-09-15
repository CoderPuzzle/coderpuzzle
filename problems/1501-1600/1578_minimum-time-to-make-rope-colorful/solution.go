func minCost(colors string, neededTime []int) int {
	total := 0
	runSum := neededTime[0]
	runMax := neededTime[0]
	for i := 1; i < len(colors); i++ {
		if colors[i] == colors[i-1] {
			runSum += neededTime[i]
			if neededTime[i] > runMax {
				runMax = neededTime[i]
			}
		} else {
			total += runSum - runMax
			runSum = neededTime[i]
			runMax = neededTime[i]
		}
	}
	total += runSum - runMax
	return total
}
