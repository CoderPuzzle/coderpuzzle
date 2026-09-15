import "fmt"

// A candidate may reuse only digits already on the clock, so at most
// 4^4 = 256 four-digit drawings cover everything. Keep the drawings that
// are real clock times (hour < 24, minute < 60) and pick the one whose
// wrapped lead over the input, (candidate - input) mod 1440, is smallest.
// Seeding the answer with the input itself at a full day's lead is the
// wrap: 23:59 comes around to 22:22, 11:11 to itself.
func nextClosestTime(time string) string {
	var present [10]bool
	for i := 0; i < 5; i++ {
		if i != 2 {
			present[time[i]-'0'] = true
		}
	}
	digits := make([]int, 0, 4)
	for d := 0; d < 10; d++ {
		if present[d] {
			digits = append(digits, d)
		}
	}
	start := (int(time[0]-'0')*10 + int(time[1]-'0')) * 60
	start += int(time[3]-'0')*10 + int(time[4]-'0')
	best, bestGap := start, 1440
	for _, h1 := range digits {
		for _, h2 := range digits {
			hour := h1*10 + h2
			if hour >= 24 {
				continue
			}
			for _, m1 := range digits {
				for _, m2 := range digits {
					minute := m1*10 + m2
					if minute >= 60 {
						continue
					}
					total := hour*60 + minute
					gap := (total - start + 1440) % 1440
					if gap > 0 && gap < bestGap {
						bestGap = gap
						best = total
					}
				}
			}
		}
	}
	return fmt.Sprintf("%02d:%02d", best/60, best%60)
}
