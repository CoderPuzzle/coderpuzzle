import "math/big"

func maxWeight(weights []int, w1 int, w2 int) int {
	// Row a is one wide integer whose bit j marks state (a, j) as
	// reachable: bag 1 filled to exactly a, bag 2 to exactly j.
	lowMask := new(big.Int)
	for b := 0; b <= w2; b++ {
		lowMask.SetBit(lowMask, b, 1)
	}
	rows := make([]*big.Int, w1+1)
	for a := range rows {
		rows[a] = new(big.Int)
	}
	rows[0].SetInt64(1)
	for _, w := range weights {
		// Bag-2 placements shift a whole row left, trimmed to the legal
		// occupancies. Stage them before the bag-1 pass below touches
		// rows, so both moves read the previous item's states only.
		shifted := make([]*big.Int, w1+1)
		for a := 0; a <= w1; a++ {
			shifted[a] = new(big.Int).And(new(big.Int).Lsh(rows[a], uint(w)), lowMask)
		}
		// Bag-1 placements OR row a - w into row a, walked downward so
		// the merge reads pre-item rows and no item is spent twice.
		for a := w1; a >= w; a-- {
			rows[a].Or(rows[a], rows[a-w])
		}
		for a := 0; a <= w1; a++ {
			rows[a].Or(rows[a], shifted[a])
		}
	}
	best := 0
	for a := 0; a <= w1; a++ {
		if rows[a].Sign() > 0 {
			// Fixed a: the best partner is the highest reachable bit.
			if candidate := a + rows[a].BitLen() - 1; candidate > best {
				best = candidate
			}
		}
	}
	return best
}
