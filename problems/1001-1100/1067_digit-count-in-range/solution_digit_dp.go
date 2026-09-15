import "strconv"

// Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
func digitsCount(d int, low int, high int) int {
	return int(countUpTo(d, int64(high)) - countUpTo(d, int64(low)-1))
}

// Each state reports how many suffix completions it admits and how many
// appearances of d those completions contain.
type dpState struct {
	completions int64
	occurrences int64
}

func countUpTo(d int, n int64) int64 {
	if n <= 0 {
		return 0
	}
	s := strconv.FormatInt(n, 10)
	digits := make([]int, len(s))
	for i := 0; i < len(s); i++ {
		digits[i] = int(s[i] - '0')
	}
	// Free (non-tight) suffixes recur, so they are memoized per
	// (position, started): nil marks a not-yet-filled cell.
	memo := make([][]*dpState, len(s))
	for i := range memo {
		memo[i] = make([]*dpState, 2)
	}
	// The all-zero completion is the number 0 and carries no
	// appearances, so the walk tallies exactly the integers 1..n.
	return solve(digits, d, 0, true, false, memo).occurrences
}

func solve(digits []int, d int, pos int, tight bool, started bool, memo [][]*dpState) dpState {
	if pos == len(digits) {
		return dpState{completions: 1}
	}
	startedIdx := 0
	if started {
		startedIdx = 1
	}
	if !tight && memo[pos][startedIdx] != nil {
		return *memo[pos][startedIdx]
	}
	maxDigit := 9
	if tight {
		maxDigit = digits[pos]
	}
	var completions int64 = 0
	var occurrences int64 = 0
	for digit := 0; digit <= maxDigit; digit++ {
		inner := solve(digits, d, pos+1, tight && digit == maxDigit, started || digit > 0, memo)
		completions += inner.completions
		occurrences += inner.occurrences
		// Placing d here shows d in every completion below, unless it is
		// a leading zero -- those are never written.
		if digit == d && (started || digit > 0) {
			occurrences += inner.completions
		}
	}
	state := dpState{completions: completions, occurrences: occurrences}
	if !tight {
		memo[pos][startedIdx] = &state
	}
	return state
}
