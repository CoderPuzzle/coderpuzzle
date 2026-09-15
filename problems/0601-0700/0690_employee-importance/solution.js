/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var getImportance = function (employees, id) {
    const byId = new Map();
    for (const employee of employees) byId.set(employee.id, employee);
    let total = 0;
    const stack = [id];
    while (stack.length > 0) {
        const employee = byId.get(stack.pop());
        total += employee.importance;
        for (const subordinate of employee.subordinates) stack.push(subordinate);
    }
    return total;
};
