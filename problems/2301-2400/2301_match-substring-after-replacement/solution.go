import "math/big"

func matchReplacement(s string, sub string, mappings [][]string) bool {
	// base[t] marks every position of s holding character t; matched[old]
	// extends it with the positions each declared target covers, so bit p
	// of matched[old] is exactly matched(old, s[p]).
	base := make([]*big.Int, 128)
	for t := range base {
		base[t] = new(big.Int)
	}
	for p := 0; p < len(s); p++ {
		t := int(s[p])
		base[t].SetBit(base[t], p, 1)
	}
	matched := make([]*big.Int, 128)
	for t := range matched {
		matched[t] = new(big.Int).Set(base[t])
	}
	for _, pair := range mappings {
		old := int(pair[0][0])
		nw := int(pair[1][0])
		matched[old].Or(matched[old], base[nw])
	}
	// bit e of seen marks a window whose first j + 1 characters all match
	// and that ends at e. Seed with the first character's mask; every
	// later character grows the survivors one position deeper into s.
	seen := new(big.Int).Set(matched[sub[0]])
	for j := 1; j < len(sub); j++ {
		seen.Lsh(seen, 1)
		seen.And(seen, matched[sub[j]])
	}
	return seen.Sign() > 0
}
