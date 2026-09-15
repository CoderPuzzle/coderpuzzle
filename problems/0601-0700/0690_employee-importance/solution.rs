use std::collections::HashMap;

impl Solution {
    pub fn get_importance(employees: Vec<Employee>, id: i32) -> i32 {
        let mut by_id: HashMap<i32, &Employee> = HashMap::new();
        for employee in &employees {
            by_id.insert(employee.id, employee);
        }
        let mut total = 0;
        let mut stack = vec![id];
        while let Some(current) = stack.pop() {
            let employee = by_id[&current];
            total += employee.importance;
            stack.extend_from_slice(&employee.subordinates);
        }
        total
    }
}
