import "sort"

func minDamage(power int, damage []int, health []int) int64 {
	n := len(damage)
	times := make([]int, n)
	ratio := make([]float64, n)
	order := make([]int, n)
	remaining := int64(0)
	for i := 0; i < n; i++ {
		order[i] = i
		// Enemy i needs ceil(health/power) seconds of focused attack to die.
		times[i] = (health[i] + power - 1) / power
		ratio[i] = float64(damage[i]) / float64(times[i])
		remaining += int64(damage[i])
	}
	// Exchange argument on adjacent kills a, b: only damage_a * t_b versus
	// damage_b * t_a differs between the two orders, so descending
	// damage/time ratio order is globally optimal.
	sort.SliceStable(order, func(a, b int) bool {
		return ratio[order[a]] > ratio[order[b]]
	})
	var answer int64
	for _, i := range order {
		// While enemy i spends times[i] seconds dying, every enemy still
		// alive (i included) keeps dealing its damage each second.
		answer += remaining * int64(times[i])
		remaining -= int64(damage[i])
	}
	return answer
}
