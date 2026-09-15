func minMaxWaitingTime(demand []int, fuel []int) int {
	// Level sweep over cars. A state packs (fuel0, fuel1, busy0, busy1)
	// -- remaining fuel and remaining busy time per dispenser, measured
	// from when the current car becomes allowed -- in base 51, mapped to
	// the smallest maximum waiting time achievable so far.
	const B = 51
	states := map[int]int{((fuel[0]*B + fuel[1]) * B) * B: 0}
	for i, d := range demand {
		nxt := make(map[int]int)
		for key, worst := range states {
			f0 := key / (B * B * B)
			f1 := (key / (B * B)) % B
			r0 := (key / B) % B
			r1 := key % B
			if f0 >= d {
				// Serve car i on dispenser 0; the other dispenser's
				// clock runs down by r0 while it waits.
				w := worst
				if r0 > w {
					w = r0
				}
				nk := (((f0-d)*B+f1)*B+d)*B + maxInt(r1-r0, 0)
				if v, ok := nxt[nk]; !ok || w < v {
					nxt[nk] = w
				}
			}
			if f1 >= d {
				w := worst
				if r1 > w {
					w = r1
				}
				nk := ((f0*B+(f1-d))*B+maxInt(r0-r1, 0))*B + d
				if v, ok := nxt[nk]; !ok || w < v {
					nxt[nk] = w
				}
			}
		}
		if len(nxt) == 0 {
			// The process terminates here and no car may be skipped,
			// so every live state has served exactly i cars.
			if i == 0 {
				return -1
			}
			break
		}
		states = nxt
	}
	ans := 1 << 30
	for _, v := range states {
		if v < ans {
			ans = v
		}
	}
	return ans
}

func maxInt(a int, b int) int {
	if a > b {
		return a
	}
	return b
}
