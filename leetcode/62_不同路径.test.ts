/*
 * @lc app=leetcode.cn id=62
 *
 * [62] 不同路径
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/unique-paths/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

import { describe, expect, test } from '@jest/globals';

function uniquePaths(m: number, n: number): number {
    let dp: number[][] = [];
    for (let i = 0; i < m; i++) {
        dp.push(new Array(n));
    }

    // 初始化起始值: 第一列和第一行 都是1; 
    // 这里可以将时间复杂度从 m * n 优化为 Math.min(m, n)
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j == 0) {
                dp[i][j] = 1;
            }
        }
    }

    // dp[m][n] = dp[m - 1][n] + dp[m][n - 1];

    // dp[0][0] = 1;

    // dp[1][1] = 2;

    // dp[m][0] = 1;

    // dp[0][n] = 1;

    // dp[2][1] = dp[1][1] + dp[2][0];

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];

};


describe('uniquePaths module', () => {
    test('111', () => {
        expect(uniquePaths(3, 7)).toBe(28);
    });

    test('222', () => {
        expect(uniquePaths(3, 3)).toBe(6);
    });

    test('666', () => {
        expect(uniquePaths(7, 3)).toBe(28);
    });

    test('888', () => {
        expect(uniquePaths(3, 2)).toBe(3);
    });
});