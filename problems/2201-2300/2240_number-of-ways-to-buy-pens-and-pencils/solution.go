func waysToBuyPensPencils(total int, cost1 int, cost2 int) int64 {
	ways := int64(0)
	for pens := 0; pens <= total/cost1; pens++ {
		remaining := int64(total - pens*cost1)
		ways += remaining/int64(cost2) + 1
	}
	return ways
}
