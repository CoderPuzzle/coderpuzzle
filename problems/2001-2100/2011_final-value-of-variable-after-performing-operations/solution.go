func finalValueAfterOperations(operations []string) int {
	value := 0
	for _, operation := range operations {
		if operation[1] == '+' {
			value++
		} else {
			value--
		}
	}
	return value
}
