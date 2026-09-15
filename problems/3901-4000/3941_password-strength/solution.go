import "strings"

func passwordStrength(password string) int {
	lower := [26]bool{}
	upper := [26]bool{}
	digit := [10]bool{}
	special := [4]bool{}
	specials := "!@#$"
	for i := 0; i < len(password); i++ {
		value := password[i]
		if value >= 'a' && value <= 'z' {
			lower[value-'a'] = true
		} else if value >= 'A' && value <= 'Z' {
			upper[value-'A'] = true
		} else if value >= '0' && value <= '9' {
			digit[value-'0'] = true
		} else {
			index := strings.IndexByte(specials, value)
			if index >= 0 {
				special[index] = true
			}
		}
	}
	answer := 0
	for _, present := range lower {
		if present {
			answer++
		}
	}
	for _, present := range upper {
		if present {
			answer += 2
		}
	}
	for _, present := range digit {
		if present {
			answer += 3
		}
	}
	for _, present := range special {
		if present {
			answer += 5
		}
	}
	return answer
}
