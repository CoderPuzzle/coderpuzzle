import "strings"

// Chunk by thousands: every group below 1000 spells independently — the
// hundreds digit's word plus "Hundred", then the remainder under 100,
// taken wholesale through the teens, tens word plus ones digit otherwise.
func numberToWords(num int) string {
	ones := []string{"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"}
	teens := []string{"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"}
	tens := []string{"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"}

	underThousand := func(value int) []string {
		group := []string{}
		if value >= 100 {
			group = append(group, ones[value/100], "Hundred")
			value %= 100
		}
		if value >= 20 {
			group = append(group, tens[value/10])
			value %= 10
		} else if value >= 10 {
			group = append(group, teens[value-10])
			value = 0
		}
		if value > 0 {
			group = append(group, ones[value])
		}
		return group
	}

	// Walk the scales high to low: each non-empty group spells itself and
	// appends its scale word, so an all-zero middle group (1000010's
	// thousands) contributes nothing at all.
	pieces := []string{}
	scales := []struct {
		value int
		name  string
	}{{1000000000, "Billion"}, {1000000, "Million"}, {1000, "Thousand"}}
	for _, scale := range scales {
		if num >= scale.value {
			pieces = append(pieces, underThousand(num/scale.value)...)
			pieces = append(pieces, scale.name)
			num %= scale.value
		}
	}
	if num > 0 {
		pieces = append(pieces, underThousand(num)...)
	}
	// Zero is the only input that leaves no piece — it spells itself.
	if len(pieces) == 0 {
		return "Zero"
	}
	return strings.Join(pieces, " ")
}
