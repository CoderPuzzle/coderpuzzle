// Problem-provided oracle (VersionControl), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version as a
// generic value, then the query budget.
#[allow(dead_code)]
pub struct VersionControl {
    bad: i64,
    budget: i64,
}

impl VersionControl {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let bad = match construction.first() {
            Some(OjValue::Int(bad)) => *bad,
            _ => panic!("VersionControl bad must be an integer"),
        };
        VersionControl { bad, budget }
    }

    pub fn is_bad_version(&mut self, version: i32) -> bool {
        if self.budget <= 0 {
            panic!("VersionControl query budget exhausted");
        }
        self.budget -= 1;
        i64::from(version) >= self.bad
    }
}
