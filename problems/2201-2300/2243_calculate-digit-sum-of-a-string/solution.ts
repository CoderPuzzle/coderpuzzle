function digitSum(s: string, k: number): string {
    while (s.length > k) {
        let next = "";
        for (let i = 0; i < s.length; i += k) {
            const group = s.slice(i, i + k);
            let sum = 0;
            for (const c of group) {
                sum += Number(c);
            }
            next += String(sum);
        }
        s = next;
    }
    return s;
}
