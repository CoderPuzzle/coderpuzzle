func maxNumberOfBalloons(text string) int {
	counts := make([]int, 26)
	for i := 0; i < len(text); i++ {
		counts[text[i]-'a']++
	}
	// balloon needs b, a, n once and l, o twice; the scarcest letter
	// caps the whole word.
	answer := counts['b'-'a']
	if v := counts['a'-'a']; v < answer {
		answer = v
	}
	if v := counts['n'-'a']; v < answer {
		answer = v
	}
	if v := counts['l'-'a'] / 2; v < answer {
		answer = v
	}
	if v := counts['o'-'a'] / 2; v < answer {
		answer = v
	}
	return answer
}
