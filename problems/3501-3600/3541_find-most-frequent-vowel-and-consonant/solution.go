// One pass into 26 buckets, then the max over the vowel buckets and the max
// over the consonant buckets. Missing letters (no vowels or no consonants at
// all) stay at 0, matching the statement's rule.
func maxFreqSum(s string) int {
	var counts [26]int
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	bestVowel, bestConsonant := 0, 0
	for i := 0; i < 26; i++ {
		ch := byte('a' + i)
		isVowel := ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'
		if isVowel {
			bestVowel = max(bestVowel, counts[i])
		} else {
			bestConsonant = max(bestConsonant, counts[i])
		}
	}
	return bestVowel + bestConsonant
}
