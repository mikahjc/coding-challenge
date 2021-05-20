export interface Discount<T> {
    computeDiscount(item: T, baseValue: number): number
}