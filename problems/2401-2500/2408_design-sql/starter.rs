pub struct SQL;

impl SQL {
    pub fn new(names: Vec<String>, columns: Vec<i32>) -> Self {
        panic!("TODO")
    }

    pub fn ins(&mut self, name: String, row: Vec<String>) -> bool {
        panic!("TODO")
    }

    pub fn rmv(&mut self, name: String, rowId: i32) {
        panic!("TODO")
    }

    pub fn sel(&mut self, name: String, rowId: i32, columnId: i32) -> String {
        panic!("TODO")
    }

    pub fn exp(&mut self, name: String) -> Vec<String> {
        panic!("TODO")
    }
}
