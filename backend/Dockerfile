FROM gradle:8-jdk21 AS build
WORKDIR /app

COPY build.gradle settings.gradle gradle.properties ./
COPY app/build.gradle ./app/build.gradle
COPY gradle ./gradle
COPY gradlew ./
COPY app/src ./app/src
RUN ./gradlew :app:clean :app:bootJar -x test --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]