package com.umutdogan.spring.ai.controller;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.ai.chat.client.ChatClient;
    import org.springframework.ai.chat.prompt.ChatOptions;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.bind.annotation.ExceptionHandler;
    import reactor.core.publisher.Flux;

    @RestController
    public class ChatController {

        private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
        private final ChatClient chatClient;

        public ChatController(ChatClient.Builder builder) {
            try {
                this.chatClient = builder
                    .build();
            } catch (Exception e) {
                logger.error("Failed to initialize ChatClient: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to initialize chat client. Check configuration.", e);
            }
        }

        @PostMapping("/chat")
        public ResponseEntity<?> chat(@RequestParam String message) {
            try {
                String response = chatClient.prompt()
                        .user(message)
                        .call()
                        .content();
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                logger.error("Chat endpoint error: {}", e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: " + e.getMessage());
            }
        }

        @GetMapping("/stream")
        public Flux<String> chatWithStream(@RequestParam String message) {
            return chatClient.prompt()
                    .user(message)
                    .stream()
                    .content()
                    .onErrorResume(e -> {
                        logger.error("Stream endpoint error: {}", e.getMessage(), e);
                        return Flux.just("Error: " + e.getMessage());
                    });
        }
    }