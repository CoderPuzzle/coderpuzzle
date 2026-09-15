class Solution:
    def getImportance(self, employees, target):
        by_id = {employee.id: employee for employee in employees}
        total = 0
        stack = [target]
        while stack:
            employee = by_id[stack.pop()]
            total += employee.importance
            stack.extend(employee.subordinates)
        return total
