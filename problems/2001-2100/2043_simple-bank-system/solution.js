class Bank {
    constructor(balance) {
        this.balance = balance.map((value) => BigInt(value));
    }

    transfer(account1, account2, money) {
        const amount = BigInt(money);
        if (!this.valid(account1) || !this.valid(account2) || this.balance[account1 - 1] < amount) {
            return false;
        }
        this.balance[account1 - 1] -= amount;
        this.balance[account2 - 1] += amount;
        return true;
    }

    deposit(account, money) {
        if (!this.valid(account)) {
            return false;
        }
        this.balance[account - 1] += BigInt(money);
        return true;
    }

    withdraw(account, money) {
        const amount = BigInt(money);
        if (!this.valid(account) || this.balance[account - 1] < amount) {
            return false;
        }
        this.balance[account - 1] -= amount;
        return true;
    }

    valid(account) {
        return account >= 1 && account <= this.balance.length;
    }
}
