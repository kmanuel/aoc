package org.example.day2;

import org.example.InputReader;

import java.util.*;
import java.util.stream.Collectors;

import static org.example.day2.Day2Solver.RPS.ROCK;

public class Day2Solver {

    public static final int DRAW_SCORE = 3;
    public static final int LOSE_SCORE = 0;
    public static final int WIN_SCORE = 6;

    enum RPS {
        ROCK(1),
        PAPER(2),
        SCISCORS(3);

        private final int shapeScore;

        RPS(int shapeScore) {
            this.shapeScore = shapeScore;
        }

        int scoreVersus(RPS other) {
            return versusScore(other) + this.shapeScore;
        }

        private RPS getWinsAgainst() {
            if (this == ROCK) {
                return SCISCORS;
            }
            if (this == PAPER) {
                return ROCK;
            }
            if (this == SCISCORS) {
                return PAPER;
            }
            throw new RuntimeException();
        }

        private RPS getLosesAgainst() {
            if (this == ROCK) {
                return PAPER;
            } else if (this == PAPER) {
                return SCISCORS;
            } else {
                return ROCK;
            }
        }

        private int versusScore(RPS other) {
            if (this == other) {
                return DRAW_SCORE;
            }
            if (this == ROCK) {
                if (other == PAPER) {
                    return LOSE_SCORE;
                } else if (other == SCISCORS) {
                    return WIN_SCORE;
                }
            }
            if (this == PAPER) {
                if (other == ROCK) {
                    return WIN_SCORE;
                } else if (other == SCISCORS) {
                    return LOSE_SCORE;
                }
            }
            if (this == SCISCORS) {
                if (other == PAPER) {
                    return WIN_SCORE;
                } else if (other == ROCK) {
                    return LOSE_SCORE;
                }
            }
            throw new RuntimeException();
        }
    }

    public void solve() {
        Map<String, RPS> mapping = new HashMap<>(Map.of(
                "A", ROCK,
                "B", RPS.PAPER,
                "C", RPS.SCISCORS,
                "X", ROCK,
                "Y", RPS.PAPER,
                "Z", RPS.SCISCORS
        ));

        String input = InputReader.read(2, "1");

        List<String> lines = Arrays.stream(input.split("\n")).collect(Collectors.toList());

        var score = 0;

        for (var line : lines) {
            String[] parts = line.split(" ");
            var opponent = mapping.get(parts[0]);
            var me = mapping.get(parts[1]);
            score += me.scoreVersus(opponent);
        }

        System.out.println(score);
    }

    public void solve2() {
        Map<String, RPS> mapping = new HashMap<>(Map.of(
                "A", ROCK,
                "B", RPS.PAPER,
                "C", RPS.SCISCORS,
                "X", ROCK,
                "Y", RPS.PAPER,
                "Z", RPS.SCISCORS
        ));

        String input = InputReader.read(2, "1");

        List<String> lines = Arrays.stream(input.split("\n")).collect(Collectors.toList());

        var score = 0;

        for (var line : lines) {
            String[] parts = line.split(" ");
            var opponent = mapping.get(parts[0]);

            switch (parts[1]) {
                case "X":
                    score += opponent.getWinsAgainst().scoreVersus(opponent);
                    break;
                case "Y":
                    score += opponent.scoreVersus(opponent);
                    break;
                case "Z":
                    score += opponent.getLosesAgainst().scoreVersus(opponent);
            }

        }

        System.out.println(score);
    }
}
