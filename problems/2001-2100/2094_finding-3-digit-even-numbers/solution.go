func findEvenNumbers(digits []int) []int {
	available := [10]int{}
	for _, digit := range digits {
		available[digit]++
	}

	answer := []int{}
	for number := 100; number < 1000; number += 2 {
		needed := [10]int{}
		needed[number/100]++
		needed[number/10%10]++
		needed[number%10]++
		possible := true
		for digit := 0; digit < 10; digit++ {
			if needed[digit] > available[digit] {
				possible = false
				break
			}
		}
		if possible {
			answer = append(answer, number)
		}
	}
	return answer
}
