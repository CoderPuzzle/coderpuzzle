class Solution {
    read(file: File, n: number, buf: string[]): number {
        let total = 0;
        const buf4: string[] = new Array(4).fill("");
        while (total < n) {
            const count = file.read4(buf4);
            if (count === 0) break;
            const take = Math.min(count, n - total);
            for (let index = 0; index < take; index++) {
                buf[total + index] = buf4[index];
            }
            total += take;
        }
        return total;
    }
}
