class Bank {
    private balance: bigint[];

    constructor(balance: number[]) {
        this.balance = balance.map((value) => BigInt(value));
    }

    transfer(account1: number, account2: number, money: number): boolean {
        const amount = BigInt(money);
        if (!this.valid(account1) || !this.valid(account2) || this.balance[account1 - 1] < amount) {
            return false;
        }
        this.balance[account1 - 1] -= amount;
        this.balance[account2 - 1] += amount;
        return true;
    }

    deposit(account: number, money: number): boolean {
        if (!this.valid(account)) {
            return false;
        }
        this.balance[account - 1] += BigInt(money);
        return true;
    }

    withdraw(account: number, money: number): boolean {
        const amount = BigInt(money);
        if (!this.valid(account) || this.balance[account - 1] < amount) {
            return false;
        }
        this.balance[account - 1] -= amount;
        return true;
    }

    private valid(account: number): boolean {
        return account >= 1 && account <= this.balance.length;
    }
}
