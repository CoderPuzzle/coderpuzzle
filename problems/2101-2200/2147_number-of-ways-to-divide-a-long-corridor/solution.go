// Sections pair the seats up in order, so exactly one divider is forced
// between each finished pair and the next seat — placeable at any of the
// plants-plus-one positions inside that gap.
func numberOfWays(corridor string) int {
	const MOD = 1_000_000_007
	ways, seats, plants := 1, 0, 0
	for i := 0; i < len(corridor); i++ {
		if corridor[i] == 'S' {
			seats++
			if seats > 2 && seats%2 == 1 {
				ways = ways * (plants + 1) % MOD
			}
			plants = 0
		} else if seats >= 2 {
			plants++
		}
	}
	if seats > 0 && seats%2 == 0 {
		return ways
	}
	return 0
}
