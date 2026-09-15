// num <= 1000, so checking every value's digit sum directly is the whole
// story.
func countEven(num int) int {
	count := 0
	for value := 1; value <= num; value++ {
		digitSum := 0
		for rest := value; rest > 0; rest /= 10 {
			digitSum += rest % 10
		}
		if digitSum%2 == 0 {
			count++
		}
	}
	return count
}
