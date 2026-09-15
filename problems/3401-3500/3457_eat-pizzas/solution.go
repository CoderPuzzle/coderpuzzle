import "sort"

// Odd days bank their maximum, so the ceil(d/2) odd days claim the
// top weights first; each even day then banks the second pizza of a
// consecutive top pair. The total reaches 5e9, so it accumulates in
// an int64.
func maxWeight(pizzas []int) int64 {
	sort.Ints(pizzas)
	n := len(pizzas)
	oddDays := (n/4 + 1) / 2
	var total int64
	top := n - 1
	for i := 0; i < oddDays; i++ {
		total += int64(pizzas[top])
		top--
	}
	for i := 0; i < n/4-oddDays; i++ {
		top--
		total += int64(pizzas[top])
		top--
	}
	return total
}
