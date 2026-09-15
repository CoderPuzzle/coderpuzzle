class ATM {
    private counts: number[];

    constructor() {
        this.counts = [0, 0, 0, 0, 0];
    }

    deposit(banknotesCount: number[]): void {
        for (let i = 0; i < 5; i++) {
            this.counts[i] += banknotesCount[i];
        }
    }

    withdraw(amount: number): number[] {
        const DENOMS = [20, 50, 100, 200, 500];
        const taken = [0, 0, 0, 0, 0];
        let remaining = amount;
        for (let i = 4; i >= 0; i--) {
            const take = Math.min(this.counts[i], Math.floor(remaining / DENOMS[i]));
            taken[i] = take;
            remaining -= take * DENOMS[i];
        }
        if (remaining !== 0) {
            return [-1];
        }
        for (let i = 0; i < 5; i++) {
            this.counts[i] -= taken[i];
        }
        return taken;
    }
}
