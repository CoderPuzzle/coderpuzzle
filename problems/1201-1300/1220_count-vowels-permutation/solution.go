func countVowelPermutation(n int) int {
	const MOD = 1000000007
	// one counter per vowel: counts of length-L strings ending in that
	// vowel — only the last character constrains the next one
	a, e, i, o, u := 1, 1, 1, 1, 1
	for t := 0; t < n-1; t++ {
		// follower rules as one simultaneous step (the tuple assignment
		// reads only old values): a<-e,i,u; e<-a,i; i<-e,o; o<-i; u<-i,o;
		// the mod keeps the exponentially growing counts bounded
		a, e, i, o, u = (e+i+u)%MOD, (a+i)%MOD, (e+o)%MOD, i, (i+o)%MOD
	}
	// n = 1 never enters the loop and sums the initial five 1s
	return (a + e + i + o + u) % MOD
}
