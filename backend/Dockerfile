# ---------- BUILD STAGE ----------
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends bash ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY gradlew build.gradle settings.gradle /app/
COPY gradle /app/gradle
RUN chmod +x /app/gradlew

COPY src /app/src

RUN ./gradlew clean bootJar -x test

# ---------- RUN STAGE ----------
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

RUN groupadd -r app && useradd -r -g app app
USER app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]