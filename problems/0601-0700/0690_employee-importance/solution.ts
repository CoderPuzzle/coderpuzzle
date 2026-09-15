function getImportance(employees: Employee[], id: number): number {
    const byId = new Map<number, Employee>();
    for (const employee of employees) byId.set(employee.id, employee);
    let total = 0;
    const stack: number[] = [id];
    while (stack.length > 0) {
        const employee = byId.get(stack.pop()!)!;
        total += employee.importance;
        for (const subordinate of employee.subordinates) stack.push(subordinate);
    }
    return total;
}
