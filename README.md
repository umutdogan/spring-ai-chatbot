##### Introduction
In this  tutorial, we'll create a simple chatbot application that supports both traditional request-response interactions and streaming responses. We'll use GitHub Marketplace's OpenAI GPT-4o model for this tutorial. We'll use Spring AI to interact with the model and create a chatbot application. Backend will be created with Spring Boot and frontend will be created with React.

##### Project Requirements
* Java 21
* React 19.0.0
* Maven 3.9.9
* Spring Boot 3.4.3
* Spring AI 1.0.0-M6

##### Project Setup
1. Clone https://github.com/umutdogan/spring-ai-chatbot repository and open with your favorite IDE (e.g. IntelliJ IDEA).
2. Ensure that you have Java 21 and Maven installed on your system.
3. Go to [GitHub Marketplace Models](https://github.com/marketplace/models) and select **OpenAI GPT-4o** model as other models are not working as expected within this GitHub Marketplace offering with Spring AI.
    1. Click the name of the model (OpenAI GPT-4o) and click **Use this model** button.
    2. It will ask you to create a personal access token. Click `Get developer key` option next to the GitHub option.
    3. Select `Generate new token (classic)` option in the opening window, give a name in the `Note` section, select an `Expiration` date. You don't need to select any `scope`s. Then click **Generate token** button.
    4. It will show you the token. Note the token as it won't be displayed again. We'll use this `token` as our API_KEY for calls.
    5. Now go back to the model selection page, and you'll notice two more parameters: `endpoint` and `model`. Note these also as we'll use these in our project's `application.properties` file.
4. Then, go back to your Spring AI project and follow these steps and update following lines in `application.properties` in the `src/main/resources` directory.
```
spring.ai.azure.openai.api-key=your_api_key  
spring.ai.azure.openai.endpoint=your_api_endpoint  
spring.ai.azure.openai.chat.options.deployment-name=gpt-4o
```
5. Build the project
```
mvn clean install
```
6. Run the application:
```
mvn spring-boot:run
```
7. Open http://localhost:8080 with your internet browser (Chrome, Safari etc.) and test the chat prompt options.

##### References
* https://umutdogan.com/posts/2025-03-17-spring-ai-chatbot-with-gpt-4o
* https://github.com/umutdogan/spring-ai-chatbot
* https://github.com/danvega/spring-ai-streaming
* https://spring.io/projects/spring-ai
* https://docs.spring.io/spring-ai/reference/
* https://docs.spring.io/spring-ai/docs/1.0.0-SNAPSHOT/api/
* https://www.youtube.com/watch?v=q2p0mG4RICM
* [Chatbot icons created by Parzival’ 1997 - Flaticon]("https://www.flaticon.com/free-icons/chatbot)