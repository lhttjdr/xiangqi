export function mergeSort<T>(source: Array<T>, compare: (a: T, b: T) => boolean) {
    let s = 1, n = source.length;
    let buff: Array<T> = new Array(n);
    while (s < n) {
        mergeAll(source, buff, s, n, compare);
        s += s;
        mergeAll(buff, source, s, n, compare);
        s += s;
    }
}
// merge [l, m] and [m+1, r]
function merge<T>(source: Array<T>, target: Array<T>, l: number, m: number, r: number, compare: (a: T, b: T) => boolean) {
    let i = l, j = m + 1, k = l;
    while ((i <= m) && (j <= r))
        if (compare(source[i],source[j])) target[k++] = source[i++];
        else target[k++] = source[j++];
    if (i > m) for (let q = j; q <= r; ++q) target[k++] = source[q];
    else for (let q = i; q <= m; ++q) target[k++] = source[q];
}
function mergeAll<T>(source: Array<T>, target: Array<T>, s: number, n, compare: (a: T, b: T) => boolean) {
    let i = 0;
    while (i <= n - 2 * s) { // merge two s-range 
        merge(source, target, i, i + s - 1, i + 2 * s - 1, compare);
        i = i + 2 * s;
    }
    if (i + s < n) merge(source, target, i, i + s - 1, n - 1, compare);
    else for (let j = i; j <= n - 1; ++j) target[j] = source[j];
}