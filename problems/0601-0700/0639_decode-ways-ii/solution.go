// dp[i] counts the decodings of the suffix s[i:]: its first code is one
// character (9 openings for '*', 1 for a nonzero digit, 0 for '0') or two
// (15 for '**', 2 or 1 for '*d' as d <= 6 or not, 9/6/0 for 'd*' as d is
// 1/2/other, 1 for two digits valued 10..26). Only dp[i+1] and dp[i+2] are
// ever read, so two rolling variables replace the table; `cur` is int64:
// before its reduction one step totals up to 9*next1 + 15*next2, near
// 24*(10^9+7), past 32-bit range.
func numDecodings(s string) int {
	const mod = 1_000_000_007
	next1, next2 := int64(1), int64(1) // dp[i+1], dp[i+2]; the empty suffix is one way
	for i := len(s) - 1; i >= 0; i-- {
		a := s[i]
		var cur int64
		if a == '*' {
			cur = 9 * next1
		} else if a != '0' {
			cur = next1
		}
		if i+1 < len(s) {
			b := s[i+1]
			if a == '*' {
				switch {
				case b == '*':
					cur += 15 * next2
				case b <= '6':
					cur += 2 * next2
				default:
					cur += next2
				}
			} else if a == '1' {
				if b == '*' {
					cur += 9 * next2
				} else {
					cur += next2
				}
			} else if a == '2' {
				switch {
				case b == '*':
					cur += 6 * next2
				case b <= '6':
					cur += next2
				}
			}
		}
		next2, next1 = next1, cur%mod
	}
	return int(next1)
}
