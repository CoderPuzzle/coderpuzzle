import "strconv"

// A pair is beautiful iff the first digit of nums[i] and the last digit of
// nums[j] are coprime; n <= 100, so test every pair.
func countBeautifulPairs(nums []int) int {
	count := 0
	for i := range nums {
		// Leading digit of nums[i] straight from its decimal string.
		first := int(strconv.Itoa(nums[i])[0] - '0')
		for j := i + 1; j < len(nums); j++ {
			// Last digit is nonzero by the constraints, and gcd(1, d)
			// == 1 makes every pair with a first digit of 1 beautiful,
			// including two 1s.
			if gcd(first, nums[j]%10) == 1 {
				count++
			}
		}
	}
	return count
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
