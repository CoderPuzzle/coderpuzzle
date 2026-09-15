function minDamage(power: number, damage: number[], health: number[]): number {
    const n = damage.length;
    const ratio: number[] = [];
    for (let i = 0; i < n; i++) {
        // Enemy i needs ceil(health/power) seconds of focused attack to die.
        const t = Math.ceil(health[i] / power);
        ratio.push(damage[i] / t);
    }
    const order: number[] = [];
    for (let i = 0; i < n; i++) order.push(i);
    const merged = order.map((v, i) => [ratio[i], v] as [number, number]);
    // Exchange argument on adjacent kills a, b: only damage_a * t_b versus
    // damage_b * t_a differs between the two orders, so descending
    // damage/time ratio order is globally optimal.
    merged.sort((a, b) => b[0] - a[0]);
    let remaining = damage.reduce((a, b) => a + b, 0);
    let answer = 0;
    for (const [, i] of merged) {
        const t = Math.ceil(health[i] / power);
        // While enemy i spends t seconds dying, every enemy still alive
        // (i included) keeps dealing its damage each second.
        answer += remaining * t;
        remaining -= damage[i];
    }
    return answer;
}
