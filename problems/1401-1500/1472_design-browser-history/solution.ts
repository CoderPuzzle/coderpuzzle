class BrowserHistory {
    private history: string[];
    private cur: number;

    constructor(homepage: string) {
        this.history = [homepage];
        this.cur = 0;
    }

    visit(url: string) {
        this.history.length = this.cur + 1;
        this.history.push(url);
        this.cur++;
    }

    back(steps: number): string {
        this.cur = Math.max(0, this.cur - steps);
        return this.history[this.cur];
    }

    forward(steps: number): string {
        this.cur = Math.min(this.history.length - 1, this.cur + steps);
        return this.history[this.cur];
    }
}
