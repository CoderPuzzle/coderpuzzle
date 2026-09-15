// The age is the two-digit field at offsets 11-12; char-code arithmetic
// decodes it without building a substring. The count is at most
// len(details) <= 100, so int is plenty.
func countSeniors(details []string) int {
	count := 0
	for _, record := range details {
		age := int(record[11]-'0')*10 + int(record[12]-'0')
		if age > 60 {
			count++
		}
	}
	return count
}
