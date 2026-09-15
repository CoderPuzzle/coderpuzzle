import "strings"

// Digits a string of the given length may place at half-position
// `position`: the outermost digit cannot be 0 (no leading zeros except "0"
// itself), and an odd length's exact middle must self-rotate, which rules
// out 6 and 9 there.
func choicesAt(position, length, half int) string {
	if position == 0 && length > 1 {
		return "1689"
	}
	if length%2 == 1 && position == half-1 {
		return "018"
	}
	return "01689"
}

// Closed form: the first half decides the whole string, so each free
// half-position multiplies the count.
func totalOfLength(length int) int {
	half := (length + 1) / 2
	total := 1
	for position := half - 1; position >= 0; position-- {
		total *= len(choicesAt(position, length, half))
	}
	return total
}

// 0, 1 and 8 rotate to themselves, 6 and 9 swap; anything else is not a
// strobogrammatic digit and fails any equality test.
func rotate(digit byte) byte {
	switch digit {
	case '6':
		return '9'
	case '9':
		return '6'
	case '0', '1', '8':
		return digit
	}
	return '?'
}

func isStrobogrammatic(value string) bool {
	for i := 0; i < len(value); i++ {
		if rotate(value[i]) != value[len(value)-1-i] {
			return false
		}
	}
	return true
}

// Strobogrammatic strings of the boundary's own length that are >= boundary.
// A candidate first differs from the boundary at one half-position: a
// larger digit there settles the comparison, and the inner positions
// complete freely, in ways[position+1] ways. Equal-length digit strings
// compare numerically (neither side has a leading zero), so plain string
// comparison works.
func countAtLeast(boundary string) int {
	length := len(boundary)
	half := (length + 1) / 2
	ways := make([]int, half+1)
	ways[half] = 1
	for position := half - 1; position >= 0; position-- {
		ways[position] = len(choicesAt(position, length, half)) * ways[position+1]
	}
	count := 0
	for position := 0; position < half; position++ {
		options := choicesAt(position, length, half)
		digit := boundary[position]
		for i := 0; i < len(options); i++ {
			if options[i] > digit {
				count += ways[position+1]
			}
		}
		if strings.IndexByte(options, digit) < 0 {
			return count
		}
	}
	// Every half-position matched, so the only surviving candidate is the
	// mirror completion of the boundary's own first half.
	candidate := boundary[:half]
	for i := length - half - 1; i >= 0; i-- {
		candidate += string(rotate(boundary[i]))
	}
	if candidate >= boundary {
		count++
	}
	return count
}

func strobogrammaticInRange(low string, high string) int {
	count := countAtLeast(low)
	// Every length above len(low) contributes in full, len(high) included;
	// the lengths strictly between never touch a boundary.
	for length := len(low) + 1; length <= len(high); length++ {
		count += totalOfLength(length)
	}
	// Subtracting countAtLeast(high) also drops high itself, so put it back
	// when high is strobogrammatic.
	count -= countAtLeast(high)
	if isStrobogrammatic(high) {
		count++
	}
	return count
}
