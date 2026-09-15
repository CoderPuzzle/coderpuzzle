class BrowserHistory {
    constructor(homepage) {
        this.history = [homepage];
        this.cur = 0;
    }

    visit(url) {
        this.history.length = this.cur + 1;
        this.history.push(url);
        this.cur++;
    }

    back(steps) {
        this.cur = Math.max(0, this.cur - steps);
        return this.history[this.cur];
    }

    forward(steps) {
        this.cur = Math.min(this.history.length - 1, this.cur + steps);
        return this.history[this.cur];
    }
}
