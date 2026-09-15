func convertTime(current string, correct string) int {
	parse := func(time string) int {
		return int(time[0]-'0')*600 + int(time[1]-'0')*60 + int(time[3]-'0')*10 + int(time[4]-'0')
	}
	diff := parse(correct) - parse(current)
	operations := 0
	for _, step := range []int{60, 15, 5, 1} {
		operations += diff / step
		diff %= step
	}
	return operations
}
