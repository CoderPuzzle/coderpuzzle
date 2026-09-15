class Solution {
  public:
    int getImportance(vector<Employee> &employees, int target) {
        std::unordered_map<int, Employee *> by_id;
        for (Employee &employee : employees)
            by_id[employee.id] = &employee;
        int total = 0;
        vector<int> stack{target};
        while (!stack.empty()) {
            Employee *employee = by_id[stack.back()];
            stack.pop_back();
            total += employee->importance;
            for (int subordinate : employee->subordinates)
                stack.push_back(subordinate);
        }
        return total;
    }
};
