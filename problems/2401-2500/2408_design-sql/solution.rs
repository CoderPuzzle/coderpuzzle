use std::collections::{BTreeMap, HashMap};

// One table record per name in a hash map: the declared column count, an
// id -> row map, and a never-reset auto-increment counter. Failed inserts
// never touch the counter, and removals never roll it back, so the ids
// issued in a table strictly ascend and are never reused — the ordered
// row map therefore gives exp() its output order.
struct Table {
    columns: usize,
    rows: BTreeMap<i32, Vec<String>>,
    next_id: i32,
}

pub struct SQL {
    tables: HashMap<String, Table>,
}

impl SQL {
    pub fn new(names: Vec<String>, columns: Vec<i32>) -> Self {
        let mut tables = HashMap::with_capacity(names.len());
        for (name, width) in names.into_iter().zip(columns) {
            tables.insert(
                name,
                Table {
                    columns: width as usize,
                    rows: BTreeMap::new(),
                    next_id: 1,
                },
            );
        }
        SQL { tables }
    }

    pub fn ins(&mut self, name: String, row: Vec<String>) -> bool {
        let table = match self.tables.get_mut(&name) {
            Some(table) => table,
            None => return false,
        };
        if row.len() != table.columns {
            return false;
        }
        table.rows.insert(table.next_id, row);
        table.next_id += 1;
        true
    }

    pub fn rmv(&mut self, name: String, rowId: i32) {
        if let Some(table) = self.tables.get_mut(&name) {
            table.rows.remove(&rowId);
        }
    }

    pub fn sel(&mut self, name: String, rowId: i32, columnId: i32) -> String {
        let table = match self.tables.get(&name) {
            Some(table) => table,
            None => return "<null>".to_string(),
        };
        let row = match table.rows.get(&rowId) {
            Some(row) => row,
            None => return "<null>".to_string(),
        };
        if columnId < 1 || columnId > table.columns as i32 {
            return "<null>".to_string();
        }
        row[(columnId - 1) as usize].clone()
    }

    pub fn exp(&mut self, name: String) -> Vec<String> {
        let table = match self.tables.get(&name) {
            Some(table) => table,
            None => return Vec::new(),
        };
        table
            .rows
            .iter()
            .map(|(row_id, row)| format!("{},{}", row_id, row.join(",")))
            .collect()
    }
}
