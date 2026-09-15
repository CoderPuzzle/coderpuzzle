const mod = 1_000_000_007

func countSteppingNumbers(low string, high string) int {
	// Both counts are residues in [0, mod), so the rebalanced difference
	// stays in range.
	return (countUpTo(high) - countUpTo(decrement(low)) + mod) % mod
}

// Stepping numbers in [1, bound], mod 1e9+7; bound "0" gives 0.
func countUpTo(bound string) int {
	if bound == "0" {
		return 0
	}
	n := len(bound)
	// ways[m][d]: mod-count of ways to append m further digits after a digit
	// d, each differing by exactly 1 from its predecessor.
	ways := make([][]int, n)
	ways[0] = []int{1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
	for m := 1; m < n; m++ {
		ways[m] = make([]int, 10)
		for d := 0; d < 10; d++ {
			total := 0
			if d > 0 {
				total = ways[m-1][d-1]
			}
			if d < 9 {
				total += ways[m-1][d+1]
			}
			ways[m][d] = total % mod
		}
	}
	count := 0
	// Every length below n: first digit 1..9 (no leading zero), then any
	// completion.
	for length := 1; length < n; length++ {
		for d := 1; d < 10; d++ {
			count = (count + ways[length-1][d]) % mod
		}
	}
	// Length n: walk the bound's digits under a tight flag. A smaller digit
	// at the first mismatching position settles the comparison; the tail then
	// completes in ways[n-1-i][choice] ways.
	prev := -1
	for i := 0; i < n; i++ {
		digit := int(bound[i] - '0')
		start := 0
		if i == 0 {
			start = 1
		}
		for choice := start; choice < digit; choice++ {
			if prev < 0 || abs(choice-prev) == 1 {
				count = (count + ways[n-1-i][choice]) % mod
			}
		}
		if prev >= 0 && abs(digit-prev) != 1 {
			return count // the equal-prefix chain is dead
		}
		prev = digit
	}
	return (count + 1) % mod // the bound itself survived the walk
}

// value - 1 on a digit string (value >= 1); borrows turn 0s into 9s and the
// collapsed leading digit is stripped.
func decrement(value string) string {
	digits := []byte(value)
	i := len(digits) - 1
	for digits[i] == '0' {
		digits[i] = '9'
		i--
	}
	digits[i]--
	first := 0
	for first < len(digits)-1 && digits[first] == '0' {
		first++
	}
	return string(digits[first:])
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
