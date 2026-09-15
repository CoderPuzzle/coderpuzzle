pub struct OrderedStream {
    // One slot per id (index 0 unused) plus ptr, the next id the output is
    // waiting for.
    slots: Vec<Option<String>>,
    ptr: usize,
}

impl OrderedStream {
    pub fn new(n: i32) -> Self {
        OrderedStream {
            slots: vec![None; n as usize + 1],
            ptr: 1,
        }
    }

    pub fn insert(&mut self, idKey: i32, value: String) -> Vec<String> {
        self.slots[idKey as usize] = Some(value);
        let mut chunk = Vec::new();
        while let Some(value) = self.slots.get_mut(self.ptr).and_then(|slot| slot.take()) {
            chunk.push(value);
            self.ptr += 1;
        }
        chunk
    }
}
