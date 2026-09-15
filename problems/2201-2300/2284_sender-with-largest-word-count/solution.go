import "strings"

func largestWordCount(messages []string, senders []string) string {
	counts := make(map[string]int)
	for index := range messages {
		counts[senders[index]] += strings.Count(messages[index], " ") + 1
	}
	bestSender := ""
	bestCount := -1
	for sender, count := range counts {
		if count > bestCount || (count == bestCount && sender > bestSender) {
			bestCount = count
			bestSender = sender
		}
	}
	return bestSender
}
