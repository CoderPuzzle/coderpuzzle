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

pub struct NestedSequenceIterator;

impl NestedSequenceIterator {
    pub fn new(nestedList: NestedInteger) -> Self {
        panic!("TODO")
    }

    pub fn nextValue(&mut self) -> i32 {
        panic!("TODO")
    }

    pub fn hasMore(&mut self) -> bool {
        panic!("TODO")
    }
}
