import (
	"sort"
	"strconv"
	"strings"
)

func alertNames(keyName []string, keyTime []string) []string {
	// Group each worker's swipe times together; comparisons only ever
	// happen within one worker's own history.
	timesByName := make(map[string][]int)
	order := []string{}
	for i, name := range keyName {
		parts := strings.Split(keyTime[i], ":")
		hours, _ := strconv.Atoi(parts[0])
		minutes, _ := strconv.Atoi(parts[1])
		// Every swipe falls on a single day, so minutes-since-midnight is
		// all the arithmetic needed — no wraparound to handle.
		if _, ok := timesByName[name]; !ok {
			order = append(order, name)
		}
		timesByName[name] = append(timesByName[name], 60*hours+minutes)
	}

	alerted := []string{}
	for _, name := range order {
		times := timesByName[name]
		sort.Ints(times)
		// A window of three consecutive swipes spans at most 60 minutes
		// exactly when the alert condition is met.
		for i := 0; i+2 < len(times); i++ {
			if times[i+2]-times[i] <= 60 {
				alerted = append(alerted, name)
				break
			}
		}
	}

	sort.Strings(alerted)
	return alerted
}
