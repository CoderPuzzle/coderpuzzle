// This file deliberately carries no `use` imports: submission sources
// may import std::rc::Rc and std::cell::RefCell themselves without
// colliding with this preamble, so shared shapes are spelled fully
// qualified.

#[derive(PartialEq, Eq, Clone, Debug)]
pub struct QuadNode {
    pub val: bool,
    pub is_leaf: bool,
    pub top_left: Option<Box<QuadNode>>,
    pub top_right: Option<Box<QuadNode>>,
    pub bottom_left: Option<Box<QuadNode>>,
    pub bottom_right: Option<Box<QuadNode>>,
}

impl QuadNode {
    pub fn new(val: bool, is_leaf: bool) -> Self {
        QuadNode {
            val,
            is_leaf,
            top_left: None,
            top_right: None,
            bottom_left: None,
            bottom_right: None,
        }
    }
}
