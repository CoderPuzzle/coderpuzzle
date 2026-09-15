import "strconv"

// One pass over 1..n building each entry from its divisors: both checks
// append their own word, so "FizzBuzz" needs no case of its own and an
// empty build falls back to the number's decimal spelling.
func fizzBuzz(n int) []string {
	answer := make([]string, 0, n)
	for i := 1; i <= n; i++ {
		entry := ""
		if i%3 == 0 {
			entry += "Fizz"
		}
		if i%5 == 0 {
			entry += "Buzz"
		}
		if entry == "" {
			answer = append(answer, strconv.Itoa(i))
		} else {
			answer = append(answer, entry)
		}
	}
	return answer
}
