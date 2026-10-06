// Problem-provided oracle (BuildInspector), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version as a
// generic value, then the query budget.
#[allow(dead_code)]
pub struct BuildInspector {
    bad: i64,
    budget: i64,
}

impl BuildInspector {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let bad = match construction.first() {
            Some(OjValue::Int(bad)) => *bad,
            _ => panic!("BuildInspector bad must be an integer"),
        };
        BuildInspector { bad, budget }
    }

    pub fn is_failing_build(&mut self, version: i32) -> bool {
        if self.budget <= 0 {
            panic!("BuildInspector query budget exhausted");
        }
        self.budget -= 1;
        i64::from(version) >= self.bad
    }
}
