// The queue lives in consecutive blocks of about sqrt(n) slots: fetch walks
// the blocks, subtracting each size from k, to find the kth element, lifts it
// out of its own block, and re-appends it at the tail — an empty block is
// dropped, a full tail rolls the value into a fresh block.
pub struct MRUQueue {
    blocks: Vec<Vec<i32>>,
    width: usize,
}

impl MRUQueue {
    pub fn new(n: i32) -> Self {
        let n = n as usize;
        let width = (n as f64).sqrt() as usize + 1;
        let mut blocks: Vec<Vec<i32>> = Vec::with_capacity(n / width + 1);
        let mut start = 1;
        while start <= n {
            let end = (start + width).min(n + 1);
            blocks.push((start..end).map(|value| value as i32).collect());
            start += width;
        }
        MRUQueue { blocks, width }
    }

    pub fn fetch(&mut self, k: i32) -> i32 {
        let mut k = k as usize;
        let mut index = 0;
        while k > self.blocks[index].len() {
            k -= self.blocks[index].len();
            index += 1;
        }
        let value = self.blocks[index].remove(k - 1);
        if self.blocks[index].is_empty() {
            self.blocks.remove(index);
        }
        let roll_over = match self.blocks.last() {
            Some(tail) => tail.len() >= self.width,
            None => true,
        };
        if roll_over {
            self.blocks.push(vec![value]);
        } else {
            self.blocks.last_mut().unwrap().push(value);
        }
        value
    }
}
