// One pass counts each distinct value's frequency in a hash map, then
// every frequency is tested for primality by trial division: a factor
// with divisor * divisor <= frequency refutes it, 0 and 1 fail outright,
// and any frequency surviving the scan is prime. Frequencies never exceed
// nums.length <= 100, so the checks are a handful of divisions each.
func checkPrimeFrequency(nums []int) bool {
	counts := make(map[int]int)
	for _, value := range nums {
		counts[value]++
	}
	for _, frequency := range counts {
		if frequency < 2 {
			continue
		}
		isPrime := true
		for divisor := 2; divisor*divisor <= frequency; divisor++ {
			if frequency%divisor == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			return true
		}
	}
	return false
}
