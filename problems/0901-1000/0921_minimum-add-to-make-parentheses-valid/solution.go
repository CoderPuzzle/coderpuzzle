// A move only inserts, so the answer is how many parentheses are missing.
// One sweep keeps the count of '(' that no ')' has claimed: a ')' consumes
// one when available, otherwise it is stranded — nothing later in s can
// pair with it — and costs an inserted '('. Unclaimed '(' at the end cost
// an inserted ')' each; both debts are forced and sufficient.
func minAddToMakeValid(s string) int {
	insertions := 0
	opened := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '(' {
			opened++
		} else if opened > 0 {
			opened--
		} else {
			insertions++
		}
	}
	return insertions + opened
}
