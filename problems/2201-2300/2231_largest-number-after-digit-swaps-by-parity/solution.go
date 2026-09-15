import "strconv"
import "sort"

func largestInteger(num int) int {
	digits := []byte(strconv.Itoa(num))
	var odd, even []byte
	for _, ch := range digits {
		if (ch-'0')%2 == 1 {
			odd = append(odd, ch)
		} else {
			even = append(even, ch)
		}
	}
	sort.Slice(odd, func(i, j int) bool { return odd[i] > odd[j] })
	sort.Slice(even, func(i, j int) bool { return even[i] > even[j] })
	out := make([]byte, 0, len(digits))
	for _, ch := range digits {
		if (ch-'0')%2 == 1 {
			out = append(out, odd[0])
			odd = odd[1:]
		} else {
			out = append(out, even[0])
			even = even[1:]
		}
	}
	result, _ := strconv.Atoi(string(out))
	return result
}
