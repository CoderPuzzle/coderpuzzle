import "sort"

func sortVowels(s string) string {
	vowels := "aeiou"
	counts := make([]int, 5)
	first := make([]int, 5)
	for i := range first {
		first[i] = len(s)
	}
	for position := 0; position < len(s); position++ {
		slot := -1
		for i := 0; i < 5; i++ {
			if s[position] == vowels[i] {
				slot = i
				break
			}
		}
		if slot != -1 {
			counts[slot]++
			if position < first[slot] {
				first[slot] = position
			}
		}
	}

	order := []int{0, 1, 2, 3, 4}
	sort.Slice(order, func(i, j int) bool {
		a, b := order[i], order[j]
		if counts[a] != counts[b] {
			return counts[a] > counts[b]
		}
		return first[a] < first[b]
	})
	arranged := make([]byte, 0, len(s))
	for _, slot := range order {
		for count := 0; count < counts[slot]; count++ {
			arranged = append(arranged, vowels[slot])
		}
	}

	answer := []byte(s)
	pointer := 0
	for position, ch := range answer {
		if ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' {
			answer[position] = arranged[pointer]
			pointer++
		}
	}
	return string(answer)
}
