import "sort"

func maxProfit(inventory []int, orders int) int {
	const MOD = int64(1000000007)
	inv := make([]int64, 0, len(inventory)+1)
	for _, x := range inventory {
		inv = append(inv, int64(x))
	}
	sort.Slice(inv, func(a, b int) bool { return inv[a] > inv[b] })
	inv = append(inv, 0) // sentinel

	total := int64(0)
	remaining := int64(orders)
	i := 0
	n := len(inv)
	for remaining > 0 && i < n-1 {
		for i+1 < n-1 && inv[i+1] == inv[i] {
			i++
		}
		h := inv[i]
		low := inv[i+1]           // next distinct level (or 0 sentinel)
		width := int64(i + 1)     // colors currently at level h or above
		band := width * (h - low) // balls in the full band (low, h]
		if remaining >= band {
			// sell every ball valued low+1 .. h for each of the width colors
			total = (total + width*(h+low+1)*(h-low)/2) % MOD
			remaining -= band
			i++
		} else {
			full := remaining / width
			rem := remaining % width
			top := h
			bottom := h - full + 1
			total = (total + width*(top+bottom)*full/2) % MOD
			total = (total + rem*(h-full)) % MOD
			remaining = 0
		}
	}
	return int(total)
}
