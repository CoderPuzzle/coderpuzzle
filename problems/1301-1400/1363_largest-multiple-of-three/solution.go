import "strings"

func largestMultipleOfThree(digits []int) string {
	counts := make([]int, 10)
	total := 0
	for _, d := range digits {
		counts[d]++
		total += d
	}

	remainder := total % 3
	if remainder == 1 {
		if !drop(counts, 1, 1) {
			drop(counts, 2, 2)
		}
	} else if remainder == 2 {
		if !drop(counts, 1, 2) {
			drop(counts, 2, 1)
		}
	}

	var b strings.Builder
	for d := 9; d >= 0; d-- {
		for i := 0; i < counts[d]; i++ {
			b.WriteByte(byte('0' + d))
		}
	}
	text := b.String()
	any := false
	for _, c := range counts {
		if c != 0 {
			any = true
		}
	}
	if text == "" || text[0] == '0' {
		if any {
			return "0"
		}
		return ""
	}
	return text
}

func drop(counts []int, dropCount int, cls int) bool {
	for d := cls; d <= 9; d += 3 {
		take := counts[d]
		if dropCount < take {
			take = dropCount
		}
		counts[d] -= take
		dropCount -= take
		if dropCount == 0 {
			return true
		}
	}
	return false
}
