// Problem-provided record class (LC 690 contract). The judge's decoder
// fills the record by field name.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct Employee {
    pub id: i32,
    pub importance: i32,
    pub subordinates: Vec<i32>,
}
