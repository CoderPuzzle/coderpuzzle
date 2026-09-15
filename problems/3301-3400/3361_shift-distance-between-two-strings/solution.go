func shiftDistance(s string, t string, nextCost []int, previousCost []int) int64 {
	// Prefix sums over the two cyclic cost rings give every letter
	// pair's cheaper direction; the answer sums the per-index pair
	// costs. One pair costs at most 25 * 10^9 = 2.5*10^10, so pair
	// costs and the grand total are accumulated in int64.
	var pn, pp [27]int64
	for k := 0; k < 26; k++ {
		pn[k+1] = pn[k] + int64(nextCost[k])
		pp[k+1] = pp[k] + int64(previousCost[k])
	}
	var cost [26][26]int64
	for a := 0; a < 26; a++ {
		for b := 0; b < 26; b++ {
			var nxt int64
			if a < b {
				nxt = pn[b] - pn[a]
			} else if a > b {
				nxt = pn[26] - pn[a] + pn[b]
			}
			var prv int64
			if b < a {
				prv = pp[a+1] - pp[b+1]
			} else if b > a {
				prv = pp[26] - pp[b+1] + pp[a+1]
			}
			if prv < nxt {
				nxt = prv
			}
			cost[a][b] = nxt
		}
	}
	var total int64
	for i := 0; i < len(s); i++ {
		total += cost[s[i]-'a'][t[i]-'a']
	}
	return total
}
