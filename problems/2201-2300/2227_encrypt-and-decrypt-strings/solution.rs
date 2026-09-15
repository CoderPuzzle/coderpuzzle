use std::collections::HashMap;

// Forward map for encryption; for decryption, dictionary words are
// pre-encrypted once and counted in a bag, so each decrypt call is one
// hash lookup — the count of dictionary strings whose encryption equals
// word2 equals the number of ways word2 decrypts into the dictionary.
pub struct Encrypter {
    forward: HashMap<u8, String>,
    enc_counts: HashMap<String, i32>,
}

impl Encrypter {
    pub fn new(keys: Vec<String>, values: Vec<String>, dictionary: Vec<String>) -> Self {
        let mut design = Encrypter {
            forward: keys
                .iter()
                .zip(values.iter())
                .map(|(k, v)| (k.as_bytes()[0], v.clone()))
                .collect(),
            enc_counts: HashMap::new(),
        };
        for word in &dictionary {
            let encrypted = design.encrypt(word.clone());
            if !encrypted.is_empty() {
                *design.enc_counts.entry(encrypted).or_insert(0) += 1;
            }
        }
        design
    }

    pub fn encrypt(&mut self, word1: String) -> String {
        let mut out = String::with_capacity(word1.len() * 2);
        for ch in word1.as_bytes() {
            match self.forward.get(ch) {
                Some(mapped) => out.push_str(mapped),
                None => return String::new(),
            }
        }
        out
    }

    pub fn decrypt(&mut self, word2: String) -> i32 {
        self.enc_counts.get(&word2).copied().unwrap_or(0)
    }
}
