func largestPalindromic(num string) string {
	// Spend each digit's full pairs into the left half, highest digit
	// first; the largest odd-count digit becomes the center. Zero
	// pairs are worthless without a nonzero digit ahead of them, so a
	// leading-zero half is stripped; all zeros -> "0".
	var cnt [10]int
	for i := 0; i < len(num); i++ {
		cnt[num[i]-'0']++
	}
	half := make([]byte, 0, len(num)/2)
	mid := byte(0)
	for d := 9; d >= 0; d-- {
		for k := cnt[d] / 2; k > 0; k-- {
			half = append(half, byte('0'+d))
		}
		if mid == 0 && cnt[d]%2 == 1 {
			mid = byte('0' + d)
		}
	}
	lead := 0
	for lead < len(half) && half[lead] == '0' {
		lead++
	}
	half = half[lead:]
	if len(half) == 0 && mid == 0 {
		return "0"
	}
	right := make([]byte, len(half))
	for i := range half {
		right[i] = half[len(half)-1-i]
	}
	ans := append([]byte{}, half...)
	if mid != 0 {
		ans = append(ans, mid)
	}
	return string(append(ans, right...))
}
