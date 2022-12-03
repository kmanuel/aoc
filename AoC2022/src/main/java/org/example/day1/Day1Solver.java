package org.example.day1;

import org.example.InputReader;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Day1Solver {
    public void solve() {
        String input = InputReader.read(1, "day/1");
        String[] sections = input.split("\\n(\\n)+");

        List<Integer> top3 = Arrays.stream(sections)
                .map(Day1Solver::getElfSum)
                .sorted(Comparator.reverseOrder())
                .limit(3)
                .collect(Collectors.toList());

        var sum = 0;
        for (var elfSum : top3) {
            sum += elfSum;
        }

        System.out.println(sum);
    }

    private static int getElfSum(String section) {
        return Arrays.stream(section.split("\n")).mapToInt(Integer::valueOf).sum();
    }

}
