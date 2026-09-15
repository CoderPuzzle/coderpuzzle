class Solution {
    constructor() {
        this.buf4 = new Array(4).fill("");
        this.buf4Count = 0;
        this.buf4Index = 0;
    }

    read(file, queries, buf) {
        let total = 0;
        for (const n of queries) {
            total += this.transfer(file, n, buf, total);
        }
        return total;
    }

    transfer(file, n, buf, offset) {
        let transferred = 0;
        while (transferred < n) {
            if (this.buf4Index === this.buf4Count) {
                this.buf4Count = file.read4(this.buf4);
                this.buf4Index = 0;
                if (this.buf4Count === 0) break;
            }
            const take = Math.min(this.buf4Count - this.buf4Index, n - transferred);
            for (let index = 0; index < take; index++) {
                buf[offset + transferred + index] = this.buf4[this.buf4Index + index];
            }
            this.buf4Index += take;
            transferred += take;
        }
        return transferred;
    }
}
