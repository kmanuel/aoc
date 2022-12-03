package org.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class InputReader {

    public static String read(int day, String part) {
        return readFile("/day/" + day + "/" + part + ".txt");
    }

    private static String readFile(String filePath) {
        Class clazz = InputReader.class;
        InputStream inputStream = clazz.getResourceAsStream(filePath);
        try {
            return readFromInputStream(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static String readFromInputStream(InputStream inputStream) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append('\n');
            }
        }
        return sb.toString();
    }

}
