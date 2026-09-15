func isSolvable(words []string, result string) bool {
	// Column-wise backtracking, mirroring hand addition: dfs(pos, row) walks
	// column pos of row `row`, accumulating a carry. Once every row of the
	// column is folded in, the sum's low digit must equal the result letter's
	// digit and the rest flows on as the new carry.
	seen := make([]bool, 26)
	leads := make([]bool, 26)
	for _, word := range words {
		for i := 0; i < len(word); i++ {
			seen[word[i]-'A'] = true
		}
		leads[word[0]-'A'] = true
	}
	for i := 0; i < len(result); i++ {
		seen[result[i]-'A'] = true
	}
	leads[result[0]-'A'] = true
	distinct := 0
	for _, s := range seen {
		if s {
			distinct++
		}
	}
	if distinct > 10 {
		return false
	}

	rows := make([]string, len(words))
	widest := 0
	for i, word := range words {
		rows[i] = reverse(word)
		if len(rows[i]) > widest {
			widest = len(rows[i])
		}
	}
	target := reverse(result)
	// No leading zeros, so the sum is at least 10^(widest-1): the result
	// needs at least `widest` digits and at most widest + 1.
	if len(target) < widest || len(target) > widest+1 {
		return false
	}
	value := make([]int, 26)
	for i := range value {
		value[i] = -1
	}
	used := make([]bool, 10)

	var dfs func(pos, row, carry int) bool
	dfs = func(pos, row, carry int) bool {
		if pos == len(target) {
			return carry == 0
		}
		if row == len(rows) {
			// All rows folded: bind the result letter of this column.
			digit := carry % 10
			ch := target[pos]
			if value[ch-'A'] != -1 {
				return value[ch-'A'] == digit && dfs(pos+1, 0, carry/10)
			}
			if used[digit] || (digit == 0 && leads[ch-'A']) {
				return false
			}
			value[ch-'A'] = digit
			used[digit] = true
			ok := dfs(pos+1, 0, carry/10)
			if !ok {
				used[digit] = false
				value[ch-'A'] = -1
			}
			return ok
		}
		var ch byte
		if pos < len(rows[row]) {
			ch = rows[row][pos]
		}
		if ch == 0 {
			return dfs(pos, row+1, carry)
		}
		if value[ch-'A'] != -1 {
			return dfs(pos, row+1, carry+value[ch-'A'])
		}
		for digit := 0; digit < 10; digit++ {
			if used[digit] || (digit == 0 && leads[ch-'A']) {
				continue
			}
			value[ch-'A'] = digit
			used[digit] = true
			if dfs(pos, row+1, carry+digit) {
				return true
			}
			used[digit] = false
			value[ch-'A'] = -1
		}
		return false
	}
	return dfs(0, 0, 0)
}

func reverse(s string) string {
	out := []byte(s)
	for i, j := 0, len(out)-1; i < j; i, j = i+1, j-1 {
		out[i], out[j] = out[j], out[i]
	}
	return string(out)
}
