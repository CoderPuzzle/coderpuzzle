func haveConflict(event1 []string, event2 []string) bool {
	// Each "HH:MM" is one minute-of-day integer, so each event is an
	// inclusive integer interval. Two inclusive intervals intersect
	// exactly when neither starts after the other ends.
	toMinutes := func(time string) int {
		return int(time[0]-'0')*600 + int(time[1]-'0')*60 + int(time[3]-'0')*10 + int(time[4]-'0')
	}
	start1, end1 := toMinutes(event1[0]), toMinutes(event1[1])
	start2, end2 := toMinutes(event2[0]), toMinutes(event2[1])
	return start1 <= end2 && start2 <= end1
}
