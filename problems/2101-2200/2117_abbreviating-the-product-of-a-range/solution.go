import (
	"fmt"
	"math"
)

func abbreviateProduct(left int, right int) string {
	const modulus int64 = 10_000_000_000
	logarithm := 0.0
	twos, fives := 0, 0
	var suffix int64 = 1
	for value := left; value <= right; value++ {
		logarithm += math.Log10(float64(value))
		remaining := value
		for remaining%2 == 0 {
			twos++
			remaining /= 2
		}
		for remaining%5 == 0 {
			fives++
			remaining /= 5
		}
		suffix = suffix * int64(remaining) % modulus
	}

	zeros := twos
	if fives < zeros {
		zeros = fives
	}
	for count := zeros; count < twos; count++ {
		suffix = suffix * 2 % modulus
	}
	for count := zeros; count < fives; count++ {
		suffix = suffix * 5 % modulus
	}

	adjustedLogarithm := logarithm - float64(zeros)
	digits := int(math.Floor(adjustedLogarithm)) + 1
	if digits <= 10 {
		return fmt.Sprintf("%de%d", suffix, zeros)
	}
	fractional := adjustedLogarithm - math.Floor(adjustedLogarithm)
	prefix := int(math.Floor(math.Pow(10, fractional+4)))
	return fmt.Sprintf("%d...%05de%d", prefix, suffix%100_000, zeros)
}
