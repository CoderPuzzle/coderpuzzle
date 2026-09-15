// Track the cheapest cost to reach the previous stop on each route; at
// stop 0 only the regular seat exists, so exp starts unreachable (a huge
// sentinel). Dropping express -> regular is free; boarding regular ->
// express costs expressCost every time. Totals reach ~2e10, so every cost
// is carried in int64, never in platform int.
func minimumCosts(regular []int, express []int, expressCost int) []int64 {
	const inf = int64(1) << 60
	reg, exp := int64(0), inf
	costs := make([]int64, 0, len(regular))
	for i := range regular {
		newReg := min(reg, exp) + int64(regular[i])
		newExp := min(reg+int64(expressCost), exp) + int64(express[i])
		reg, exp = newReg, newExp
		costs = append(costs, min(reg, exp))
	}
	return costs
}
