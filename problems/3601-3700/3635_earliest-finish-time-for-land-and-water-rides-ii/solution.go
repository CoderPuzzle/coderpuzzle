func earliestFinishTime(landStartTime []int, landDuration []int, waterStartTime []int, waterDuration []int) int {
	// Only the moment the first ride ends matters: the second ride then costs
	// max(open, finish) + duration, which never improves when the hand-off
	// gets later. So each order fixes the earliest-finishing ride of the
	// first category and scans the other category.
	landFinish := landStartTime[0] + landDuration[0]
	for i := 1; i < len(landStartTime); i++ {
		if v := landStartTime[i] + landDuration[i]; v < landFinish {
			landFinish = v
		}
	}
	waterFinish := waterStartTime[0] + waterDuration[0]
	for j := 1; j < len(waterStartTime); j++ {
		if v := waterStartTime[j] + waterDuration[j]; v < waterFinish {
			waterFinish = v
		}
	}
	landFirst := max(waterStartTime[0], landFinish) + waterDuration[0]
	for j := 1; j < len(waterStartTime); j++ {
		if v := max(waterStartTime[j], landFinish) + waterDuration[j]; v < landFirst {
			landFirst = v
		}
	}
	waterFirst := max(landStartTime[0], waterFinish) + landDuration[0]
	for i := 1; i < len(landStartTime); i++ {
		if v := max(landStartTime[i], waterFinish) + landDuration[i]; v < waterFirst {
			waterFirst = v
		}
	}
	return min(landFirst, waterFirst)
}
