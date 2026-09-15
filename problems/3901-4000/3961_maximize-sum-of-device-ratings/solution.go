func maxRatings(units [][]int) int64 {
	if len(units[0]) == 1 {
		var answer int64
		for _, device := range units {
			answer += int64(device[0])
		}
		return answer
	}

	maximumInt := int(^uint(0) >> 1)
	globalMinimum := maximumInt
	smallestSecond := maximumInt
	var secondSum int64
	for _, device := range units {
		first, second := maximumInt, maximumInt
		for _, capacity := range device {
			if capacity < first {
				first, second = capacity, first
			} else if capacity < second {
				second = capacity
			}
		}
		if first < globalMinimum {
			globalMinimum = first
		}
		if second < smallestSecond {
			smallestSecond = second
		}
		secondSum += int64(second)
	}
	return secondSum - int64(smallestSecond) + int64(globalMinimum)
}
