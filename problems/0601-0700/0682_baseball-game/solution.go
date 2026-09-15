import "strconv"

// Every operation only ever touches the end of the record: a literal pushes,
// the double and the sum read the last entry (or the last two) and push, the
// cancel pops. Replaying the operations left to right on a stack is therefore
// the whole computation, and the answer is the sum of what is left — 0 when
// the record ends empty.
func calPoints(operations []string) int {
	record := make([]int, 0, len(operations))
	for _, op := range operations {
		switch op {
		case "+":
			record = append(record, record[len(record)-1]+record[len(record)-2])
		case "D":
			record = append(record, 2*record[len(record)-1])
		case "C":
			record = record[:len(record)-1]
		default:
			value, _ := strconv.Atoi(op)
			record = append(record, value)
		}
	}
	total := 0
	for _, score := range record {
		total += score
	}
	return total
}
