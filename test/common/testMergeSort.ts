import { mergeSort } from '../../src/common/tools';
import { expect } from 'chai';
import 'mocha';

describe('Merge Sort', () => {
    it('Merge Sort.', () => {
        let xs = [7, 3, 4, 2, 5, 1, 6];
        mergeSort(xs, (a, b) => a < b);
        expect([1, 2, 3, 4, 5, 6, 7]).to.deep.equals(xs);
    });
});