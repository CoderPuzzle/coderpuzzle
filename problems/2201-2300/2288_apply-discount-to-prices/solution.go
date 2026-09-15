import (
	"fmt"
	"strconv"
	"strings"
)

func discountPrices(sentence string, discount int) string {
	// A word is a price exactly when '$' leads a run of digits only.
	// Whole-dollar prices make price * (100 - discount) the discounted value
	// in exact cents, so integer arithmetic renders the two decimals without
	// ever touching binary floats.
	words := strings.Split(sentence, " ")
	for index, word := range words {
		price := len(word) > 1 && word[0] == '$'
		for position := 1; price && position < len(word); position++ {
			if word[position] < '0' || word[position] > '9' {
				price = false
			}
		}
		if !price {
			continue
		}
		value, _ := strconv.ParseInt(word[1:], 10, 64)
		cents := value * int64(100-discount)
		words[index] = fmt.Sprintf("$%d.%02d", cents/100, cents%100)
	}
	return strings.Join(words, " ")
}
