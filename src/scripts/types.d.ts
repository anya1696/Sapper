// types.d.ts

interface Point {
    x: double;
    y: double;
} // Point

interface Interval {
    min: double;
    max: double;
} // Interval

type number = number;
type double = number;
type Vec2i = [number, number];
type Vec2f = [double, double];
type Vec3i = [number, number, number];
type Vec3f = [double, double, double];
