class Solution {
    private radius: number;
    private xCenter: number;
    private yCenter: number;

    constructor(radius: number, x_center: number, y_center: number) {
        this.radius = radius;
        this.xCenter = x_center;
        this.yCenter = y_center;
    }

    randPoint(): number[] {
        let dx: number;
        let dy: number;
        do {
            dx = (2.0 * Math.random() - 1.0) * this.radius;
            dy = (2.0 * Math.random() - 1.0) * this.radius;
        } while (dx * dx + dy * dy > this.radius * this.radius);
        const half = this.radius * 0.5;
        const i = Math.min(3, Math.max(0, Math.floor(dx / half) + 2));
        const j = Math.min(3, Math.max(0, Math.floor(dy / half) + 2));
        return [this.xCenter + (i - 1.5) * half, this.yCenter + (j - 1.5) * half];
    }
}
