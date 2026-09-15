func secondsBetweenTimes(startTime string, endTime string) int {
	return seconds(endTime) - seconds(startTime)
}

func seconds(value string) int {
	hours := int(value[0]-'0')*10 + int(value[1]-'0')
	minutes := int(value[3]-'0')*10 + int(value[4]-'0')
	seconds := int(value[6]-'0')*10 + int(value[7]-'0')
	return hours*3600 + minutes*60 + seconds
}
