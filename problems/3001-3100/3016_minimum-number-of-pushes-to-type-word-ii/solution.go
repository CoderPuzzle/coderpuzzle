import "sort"

func minimumPushes(word string) int {
	var counts [26]int
	for _, letter := range word {
		counts[letter-'a']++
	}
	sort.Slice(counts[:], func(i, j int) bool { return counts[i] > counts[j] })
	answer := 0
	for index, count := range counts {
		answer += count * (index/8 + 1)
	}
	return answer
}
