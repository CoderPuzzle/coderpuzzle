// Problem-provided oracle (Master), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the wordlist and the secret word as
// generic values, then the guess budget.
#[allow(dead_code)]
pub struct Master {
    secret: String,
    found: bool,
    budget: i64,
}

impl Master {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        match construction.first() {
            Some(OjValue::Array(_)) => {}
            _ => panic!("Master wordlist must be an array"),
        }
        let secret = match construction.get(1) {
            Some(OjValue::Str(text)) => text.clone(),
            _ => panic!("Master secret must be a string"),
        };
        Master {
            secret,
            found: false,
            budget,
        }
    }

    pub fn guess(&mut self, word: &str) -> i32 {
        if self.budget <= 0 {
            panic!("Master guess budget exhausted");
        }
        self.budget -= 1;
        if word == self.secret {
            self.found = true;
        }
        self.secret.bytes().zip(word.bytes()).filter(|(a, b)| a == b).count() as i32
    }

    pub fn verdict(&self) -> OjValue {
        OjValue::Bool(self.found)
    }
}
