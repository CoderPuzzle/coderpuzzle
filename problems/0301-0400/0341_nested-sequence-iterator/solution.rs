// This is the interface that allows for creating nested lists.
// LC's nested-list API: an integer or a list of NestedInteger.
// pub struct NestedInteger { integer: Option<i32>, list: Vec<NestedInteger> }
// impl NestedInteger {
//     pub fn new() -> Self
//     pub fn with_integer(value: i32) -> Self
//     pub fn is_integer(&self) -> bool
//     pub fn get_integer(&self) -> Option<i32>
//     pub fn set_integer(&mut self, value: i32)
//     pub fn add(&mut self, item: NestedInteger)
//     pub fn get_list(&self) -> &[NestedInteger]
// }

pub struct NestedSequenceIterator {
    values: Vec<i32>,
    cursor: usize,
}

impl NestedSequenceIterator {
    pub fn new(nestedList: NestedInteger) -> Self {
        fn walk(item: &NestedInteger, out: &mut Vec<i32>) {
            if item.is_integer() {
                out.push(item.get_integer());
                return;
            }
            for child in item.get_list() {
                walk(child, out);
            }
        }
        let mut values = Vec::new();
        for item in nestedList.get_list() {
            walk(item, &mut values);
        }
        NestedSequenceIterator { values, cursor: 0 }
    }

    pub fn nextValue(&mut self) -> i32 {
        let value = self.values[self.cursor];
        self.cursor += 1;
        value
    }

    pub fn hasMore(&mut self) -> bool {
        self.cursor < self.values.len()
    }
}
