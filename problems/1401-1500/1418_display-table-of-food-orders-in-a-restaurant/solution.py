from typing import Dict, List


class Solution:
    def displayTable(self, orders: List[List[str]]) -> List[List[str]]:
        counts: Dict[str, Dict[str, int]] = {}
        foods = set()
        for _, table, food in orders:
            foods.add(food)
            row = counts.setdefault(table, {})
            row[food] = row.get(food, 0) + 1
        sorted_foods = sorted(foods)
        sorted_tables = sorted(counts, key=int)
        grid = [["Table"] + sorted_foods]
        for table in sorted_tables:
            row = counts[table]
            grid.append([table] + [str(row.get(food, 0)) for food in sorted_foods])
        return grid
