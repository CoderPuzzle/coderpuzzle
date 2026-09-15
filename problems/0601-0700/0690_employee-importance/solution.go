func getImportance(employees []Employee, id int) int {
	byID := make(map[int]*Employee)
	for position := range employees {
		byID[employees[position].id] = &employees[position]
	}
	total := 0
	stack := []int{id}
	for len(stack) > 0 {
		employee := byID[stack[len(stack)-1]]
		stack = stack[:len(stack)-1]
		total += employee.importance
		stack = append(stack, employee.subordinates...)
	}
	return total
}
