import (
	"sort"
	"strconv"
	"strings"
)

// Chronological sweep: order events by timestamp, offline events ahead
// of messages at the same moment (a status change applies before any
// message sharing its timestamp). Each user's return time is the
// offline timestamp + 60; a message at time t sees the user once that
// return time has passed.
func countMentions(numberOfUsers int, events [][]string) []int {
	sort.SliceStable(events, func(i, j int) bool {
		ti, _ := strconv.Atoi(events[i][1])
		tj, _ := strconv.Atoi(events[j][1])
		if ti != tj {
			return ti < tj
		}
		ri, rj := 0, 0
		if events[i][0] == "MESSAGE" {
			ri = 1
		}
		if events[j][0] == "MESSAGE" {
			rj = 1
		}
		return ri < rj
	})
	mentions := make([]int, numberOfUsers)
	backAt := make([]int, numberOfUsers)
	for _, event := range events {
		time, _ := strconv.Atoi(event[1])
		if event[0] == "OFFLINE" {
			id, _ := strconv.Atoi(event[2])
			backAt[id] = time + 60
			continue
		}
		for _, token := range strings.Split(event[2], " ") {
			switch token {
			case "ALL":
				for user := range mentions {
					mentions[user]++
				}
			case "HERE":
				for user := range mentions {
					if backAt[user] <= time {
						mentions[user]++
					}
				}
			default:
				id, _ := strconv.Atoi(token[2:])
				mentions[id]++
			}
		}
	}
	return mentions
}
