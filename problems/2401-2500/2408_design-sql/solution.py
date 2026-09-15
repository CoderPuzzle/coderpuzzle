from typing import List


class SQL:
    """One table record per name in a hash map: the declared column
    count, an id -> row map, and a never-reset auto-increment counter.
    Failed inserts never touch the counter, and removals never roll it
    back, so the ids issued in a table strictly ascend and are never
    reused — sorting the row map's keys is therefore also the exp()
    output order.
    """

    def __init__(self, names: List[str], columns: List[int]):
        self.tables = {}
        for name, width in zip(names, columns):
            self.tables[name] = {"columns": width, "rows": {}, "next_id": 1}

    def ins(self, name: str, row: List[str]) -> bool:
        table = self.tables.get(name)
        if table is None or len(row) != table["columns"]:
            return False
        table["rows"][table["next_id"]] = row
        table["next_id"] += 1
        return True

    def rmv(self, name: str, rowId: int):
        table = self.tables.get(name)
        if table is not None:
            table["rows"].pop(rowId, None)

    def sel(self, name: str, rowId: int, columnId: int) -> str:
        table = self.tables.get(name)
        if table is None:
            return "<null>"
        row = table["rows"].get(rowId)
        if row is None or not 1 <= columnId <= table["columns"]:
            return "<null>"
        return row[columnId - 1]

    def exp(self, name: str) -> List[str]:
        table = self.tables.get(name)
        if table is None:
            return []
        return [str(row_id) + "," + ",".join(row) for row_id, row in sorted(table["rows"].items())]
