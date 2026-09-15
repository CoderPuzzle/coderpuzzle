function angleClock(hour: number, minutes: number): number {
    // Hour hand: 30 degrees per hour plus 0.5 per minute; minute hand:
    // 6 per minute. The two vertical angles sum to 360, so fold.
    const hourPos = 30 * (hour % 12) + 0.5 * minutes;
    const minutePos = 6 * minutes;
    const diff = Math.abs(hourPos - minutePos);
    return Math.min(diff, 360 - diff);
}
