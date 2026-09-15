// One table record per name in a hash map: the declared column count, an
// id -> row map, and a never-reset auto-increment counter. Failed inserts
// never touch the counter, and removals never roll it back, so the ids
// issued in a table strictly ascend and are never reused — sorting the
// row map's keys is therefore also the exp() output order.
class SQL {
    constructor(names, columns) {
        this.tables = new Map();
        for (let i = 0; i < names.length; ++i) {
            this.tables.set(names[i], {
                columns: columns[i],
                rows: new Map(),
                nextId: 1,
            });
        }
    }

    ins(name, row) {
        const table = this.tables.get(name);
        if (table === undefined || row.length !== table.columns) {
            return false;
        }
        table.rows.set(table.nextId, row);
        table.nextId += 1;
        return true;
    }

    rmv(name, rowId) {
        const table = this.tables.get(name);
        if (table !== undefined) {
            table.rows.delete(rowId);
        }
    }

    sel(name, rowId, columnId) {
        const table = this.tables.get(name);
        if (table === undefined) {
            return "<null>";
        }
        const row = table.rows.get(rowId);
        if (row === undefined || columnId < 1 || columnId > table.columns) {
            return "<null>";
        }
        return row[columnId - 1];
    }

    exp(name) {
        const table = this.tables.get(name);
        if (table === undefined) {
            return [];
        }
        return [...table.rows.keys()]
            .sort((a, b) => a - b)
            .map((rowId) => rowId + "," + table.rows.get(rowId).join(","));
    }
}
