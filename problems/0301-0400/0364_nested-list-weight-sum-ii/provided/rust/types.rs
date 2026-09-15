// This file deliberately carries no `use` imports: submission sources
// may import std::rc::Rc and std::cell::RefCell themselves without
// colliding with this preamble, so shared shapes are spelled fully
// qualified.

#[derive(PartialEq, Eq, Clone, Debug)]
pub struct NestedInteger {
    integer: Option<i32>,
    list: Vec<NestedInteger>,
}

impl NestedInteger {
    pub fn new() -> Self {
        NestedInteger {
            integer: None,
            list: Vec::new(),
        }
    }

    pub fn with_integer(value: i32) -> Self {
        NestedInteger {
            integer: Some(value),
            list: Vec::new(),
        }
    }

    pub fn is_integer(&self) -> bool {
        self.integer.is_some()
    }

    pub fn get_integer(&self) -> i32 {
        self.integer.unwrap_or(0)
    }

    pub fn set_integer(&mut self, value: i32) {
        self.integer = Some(value);
        self.list = Vec::new();
    }

    pub fn add(&mut self, item: NestedInteger) {
        self.integer = None;
        self.list.push(item);
    }

    pub fn get_list(&self) -> &[NestedInteger] {
        &self.list
    }
}

impl Default for NestedInteger {
    fn default() -> Self {
        NestedInteger::new()
    }
}
