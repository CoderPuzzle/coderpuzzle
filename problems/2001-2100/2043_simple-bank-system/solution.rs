pub struct Bank {
    balance: Vec<i64>,
}

impl Bank {
    pub fn new(balance: Vec<i64>) -> Self {
        Bank { balance }
    }

    pub fn transfer(&mut self, account1: i32, account2: i32, money: i64) -> bool {
        if !self.valid(account1) || !self.valid(account2) || self.balance[account1 as usize - 1] < money {
            return false;
        }
        self.balance[account1 as usize - 1] -= money;
        self.balance[account2 as usize - 1] += money;
        true
    }

    pub fn deposit(&mut self, account: i32, money: i64) -> bool {
        if !self.valid(account) {
            return false;
        }
        self.balance[account as usize - 1] += money;
        true
    }

    pub fn withdraw(&mut self, account: i32, money: i64) -> bool {
        if !self.valid(account) || self.balance[account as usize - 1] < money {
            return false;
        }
        self.balance[account as usize - 1] -= money;
        true
    }

    fn valid(&self, account: i32) -> bool {
        account >= 1 && account as usize <= self.balance.len()
    }
}
