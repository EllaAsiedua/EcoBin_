package com.greencycle.Backend;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
@SpringBootTest
@Import(TestConfig.class)  // 👈 Add this line
class BackendApplicationTests {
    @Test
    void contextLoads() {
    }
}

