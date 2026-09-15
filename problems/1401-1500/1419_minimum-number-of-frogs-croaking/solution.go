import "strings"

func minNumberOfFrogs(croakOfFrogs string) int {
	order := "croak"
	counts := [5]int{}
	active, answer := 0, 0
	for i := 0; i < len(croakOfFrogs); i++ {
		ch := croakOfFrogs[i]
		index := strings.IndexByte(order, ch)
		if index < 0 {
			return -1
		}
		if index == 0 {
			counts[0]++
			active++
			if active > answer {
				answer = active
			}
		} else {
			if counts[index-1] == 0 {
				return -1
			}
			counts[index-1]--
			counts[index]++
			if index == 4 {
				active--
			}
		}
	}
	for i := 0; i < 4; i++ {
		if counts[i] != 0 {
			return -1
		}
	}
	return answer
}
