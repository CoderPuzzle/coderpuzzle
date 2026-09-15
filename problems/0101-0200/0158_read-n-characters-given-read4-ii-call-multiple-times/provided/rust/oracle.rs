// Problem-provided oracle (the read4 wire). The wrapper constructs the
// oracle from its tagged case values plus the query budget; content is
// a generic OjValue array of 1-character strings, capacity the judge's
// out-buffer allocation for the case (unused by the file). Paths stay
// fully qualified — every assembled source shares one module.
pub struct File {
    content: Vec<String>,
    budget: i64,
    position: usize,
}

impl File {
    // values carries one entry per oracle-construction key: values[0] is
    // the content array itself, values[1] the buffer capacity.
    pub fn new(values: &[OjValue], budget: i64) -> Self {
        let mut chars: Vec<String> = Vec::new();
        match &values[0] {
            OjValue::Array(items) => {
                for value in items {
                    match value {
                        OjValue::Str(text) => chars.push(text.clone()),
                        _ => panic!("Oracle content must be strings"),
                    }
                }
            }
            _ => panic!("Oracle content must be an array"),
        }
        File {
            content: chars,
            budget,
            position: 0,
        }
    }

    pub fn read4(&mut self, buf4: &mut Vec<String>) -> i32 {
        if self.budget <= 0 {
            panic!("Oracle query budget exhausted");
        }
        self.budget -= 1;
        let count = 4.min(self.content.len() - self.position);
        for index in 0..count {
            buf4[index] = self.content[self.position + index].clone();
        }
        self.position += count;
        count as i32
    }
}
