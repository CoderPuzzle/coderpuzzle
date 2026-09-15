import "fmt"

// Four slots H1 H2 M1 M2 and four digits admit exactly 4! = 24 deals.
// A deal is a real time when the hour stays below 24 and the minute
// below 60, and comparing survivors as minutes past midnight picks the
// latest outright. The sentinel -1 means no deal survived, so nothing
// beats it and the empty string is returned.
func largestTimeFromDigits(arr []int) string {
	best := -1
	for i := 0; i < 4; i++ {
		for j := 0; j < 4; j++ {
			if j == i {
				continue
			}
			for k := 0; k < 4; k++ {
				if k == i || k == j {
					continue
				}
				l := 6 - i - j - k
				hour := arr[i]*10 + arr[j]
				minute := arr[k]*10 + arr[l]
				if hour < 24 && minute < 60 {
					total := hour*60 + minute
					if total > best {
						best = total
					}
				}
			}
		}
	}
	if best < 0 {
		return ""
	}
	return fmt.Sprintf("%02d:%02d", best/60, best%60)
}
