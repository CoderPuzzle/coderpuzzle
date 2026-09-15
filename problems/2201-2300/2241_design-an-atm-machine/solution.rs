const DENOMS: [i64; 5] = [20, 50, 100, 200, 500];

pub struct ATM {
    counts: Vec<i64>,
}

impl ATM {
    pub fn new() -> Self {
        ATM { counts: vec![0; 5] }
    }

    pub fn deposit(&mut self, banknotesCount: Vec<i64>) {
        for i in 0..5 {
            self.counts[i] += banknotesCount[i];
        }
    }

    pub fn withdraw(&mut self, amount: i64) -> Vec<i64> {
        let mut taken = vec![0i64; 5];
        let mut remaining = amount;
        for i in (0..5).rev() {
            let take = if remaining / DENOMS[i] < self.counts[i] {
                remaining / DENOMS[i]
            } else {
                self.counts[i]
            };
            taken[i] = take;
            remaining -= take * DENOMS[i];
        }
        if remaining != 0 {
            return vec![-1];
        }
        for i in 0..5 {
            self.counts[i] -= taken[i];
        }
        taken
    }
}
