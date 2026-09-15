// No waiting means a potion's passage is rigid: once potion j starts at
// wizard 0 at time s_j, wizard i finishes it at exactly s_j + mana[j]*pref[i],
// with pref[i] = skill[0] + ... + skill[i-1]. Wizard i accepts potion j only
// after finishing potion j-1, so the earliest feasible starts obey, with
// prev = mana[j-1], cur = mana[j],
//
//	s_j - s_{j-1} = max_i ( prev*skill[i] + (prev-cur)*pref[i] ),
//
// and choosing each s_j minimally is globally optimal since every constraint
// grows monotonically with earlier starts. The maximand is the upper
// envelope of the lines skill[i] + t*pref[i] queried at t = (prev-cur)/prev;
// pref is strictly increasing, so the hull builds in one pass and each query
// binary-searches it with exact integer cross-multiplications. Times reach
// ~6.25 * 10^14, so every sum and product runs in int64.
func minTime(skill []int, mana []int) int64 {
	n := len(skill)
	pref := make([]int64, n+1)
	for i, s := range skill {
		pref[i+1] = pref[i] + int64(s)
	}

	hullS := make([]int64, n)
	hullP := make([]int64, n)
	size := 0
	for i, s := range skill {
		// Pop the top line while it is never strictly above its
		// neighbours: skill >= 1 keeps every slope distinct.
		for size >= 2 &&
			(hullS[size-2]-int64(s))*(hullP[size-1]-hullP[size-2]) <=
				(hullS[size-2]-hullS[size-1])*(pref[i]-hullP[size-2]) {
			size--
		}
		hullS[size] = int64(s)
		hullP[size] = pref[i]
		size++
	}

	total := int64(0)
	previous := int64(mana[0])
	for j := 1; j < len(mana); j++ {
		current := int64(mana[j])
		p, q := previous-current, previous
		// Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
		lo, hi := 0, size-1
		for lo < hi {
			mid := (lo + hi) / 2
			if q*(hullS[mid+1]-hullS[mid]) >= p*(hullP[mid]-hullP[mid+1]) {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		total += hullS[lo]*q + hullP[lo]*p
		previous = current
	}
	return total + pref[n]*int64(mana[len(mana)-1])
}
