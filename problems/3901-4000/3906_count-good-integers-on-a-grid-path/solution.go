import "fmt"

func countGoodIntegersOnPath(l int64, r int64, directions string) int64 {
	selected := make([]bool, 16)
	row, column := 0, 0
	selected[0] = true
	for _, move := range directions {
		if move == 'D' {
			row++
		} else {
			column++
		}
		selected[row*4+column] = true
	}

	countUpTo := func(bound int64) int64 {
		if bound < 0 {
			return 0
		}
		value := fmt.Sprintf("%016d", bound)
		dp := make([][]int64, 2)
		for i := range dp {
			dp[i] = make([]int64, 11)
		}
		dp[1][10] = 1
		for position := 0; position < 16; position++ {
			next := make([][]int64, 2)
			for i := range next {
				next[i] = make([]int64, 11)
			}
			for tight := 0; tight < 2; tight++ {
				limit := 9
				if tight == 1 {
					limit = int(value[position] - '0')
				}
				for previous := 0; previous <= 10; previous++ {
					ways := dp[tight][previous]
					if ways == 0 {
						continue
					}
					for digit := 0; digit <= limit; digit++ {
						if selected[position] && previous != 10 && digit < previous {
							continue
						}
						nextPrevious := previous
						if selected[position] {
							nextPrevious = digit
						}
						nextTight := 0
						if tight == 1 && digit == limit {
							nextTight = 1
						}
						next[nextTight][nextPrevious] += ways
					}
				}
			}
			dp = next
		}
		var total int64
		for _, row := range dp {
			for _, ways := range row {
				total += ways
			}
		}
		return total
	}

	return countUpTo(r) - countUpTo(l-1)
}
