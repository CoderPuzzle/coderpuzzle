func numUniqueEmails(emails []string) int {
	distinct := make(map[string]struct{})
	for _, email := range emails {
		normalized := make([]byte, 0, len(email))
		ignored := false
		for i := 0; i < len(email); i++ {
			ch := email[i]
			if ch == '@' {
				// The domain is untouched: take it verbatim from '@' on.
				normalized = append(normalized, email[i:]...)
				break
			}
			if ignored {
				continue // everything after the first '+' is dropped
			}
			if ch == '.' {
				continue // dots in the local name vanish
			}
			if ch == '+' {
				ignored = true
				continue
			}
			normalized = append(normalized, ch)
		}
		distinct[string(normalized)] = struct{}{}
	}
	return len(distinct)
}
