import "sort"

// A cost can only be balanced if its combined frequency across the two
// baskets is even; an odd count makes equality impossible no matter how
// fruits are swapped. Every |diff| / 2 surplus copies become relocation
// tickets: real swaps always pair one export with one import, so among all
// pooled tickets only the cheapest half genuinely travels far, and any
// ticket above twice the global minimum m clears via the m relay for a flat
// 2*m. At most n tickets pay at most n * 2 * 10^9 <= 2*10^14, int64-safe.
func minCost(basket1 []int, basket2 []int) int64 {
	diff := make(map[int]int)
	for _, x := range basket1 {
		diff[x]++
	}
	for _, x := range basket2 {
		diff[x]--
	}
	tickets := []int64{}
	for value, delta := range diff {
		if delta%2 != 0 {
			return -1
		}
		if delta < 0 {
			delta = -delta
		}
		for k := 0; k < delta/2; k++ {
			tickets = append(tickets, int64(value))
		}
	}
	smallest := basket1[0]
	for _, x := range basket1 {
		if x < smallest {
			smallest = x
		}
	}
	for _, x := range basket2 {
		if x < smallest {
			smallest = x
		}
	}
	sort.Slice(tickets, func(i, j int) bool { return tickets[i] < tickets[j] })
	var answer int64
	half := len(tickets) / 2
	for i := 0; i < half; i++ {
		price := int64(2 * smallest)
		if tickets[i] < price {
			price = tickets[i]
		}
		answer += price
	}
	return answer
}
