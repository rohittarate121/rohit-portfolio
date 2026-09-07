# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Dependencies first, cached in their own layer — only re-downloaded
# when pom.xml itself actually changes, not on every code edit.
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B package -DskipTests

# Copy to a fixed filename, then split into layers Docker can cache
# independently (dependencies rarely change; your own code changes every
# commit). Note: the jarmode is "tools" (not "layertools" — that name was
# retired in Spring Boot 3.3+), and --layers is what makes it produce a
# per-layer split rather than a single flat extraction.
RUN cp target/app.jar application.jar
RUN java -Djarmode=tools -jar application.jar extract --layers --destination extracted

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# curl is needed for the HEALTHCHECK below — the base JRE image doesn't
# include it. Installed and cache-cleaned in one layer to keep image size down.
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system spring && useradd --system --gid spring spring

COPY --from=build --chown=spring:spring /app/extracted/dependencies/ ./
COPY --from=build --chown=spring:spring /app/extracted/spring-boot-loader/ ./
COPY --from=build --chown=spring:spring /app/extracted/snapshot-dependencies/ ./
COPY --from=build --chown=spring:spring /app/extracted/application/ ./

USER spring

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Note: with the current "tools" jarmode, this is a plain "java -jar" —
# not "java org.springframework.boot.loader.launch.JarLauncher" like
# older layertools-based Dockerfiles use. Different extraction layout,
# different launch command to match.
ENTRYPOINT ["java", "-jar", "application.jar"]