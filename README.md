# Voting App (Full Stack)

A full-stack polling application with an **Angular frontend** (`poll-app`) and a **Spring Boot backend API** (root project). Users can create polls, list polls, view a poll by id, and submit votes.

![Poll App Screenshot](assets/poll-image.png)

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 22, Bootstrap 5, TypeScript |
| Backend | Spring Boot, Spring Data JPA, Java |
| Database | MySQL |
| Tooling | npm, Angular CLI, Maven Wrapper (`mvnw.cmd`) |

## Project structure

- `poll-app/` - Angular client application
- `src/main/java/.../controller/PollController` - REST endpoints under `/api/polls`
- `src/main/java/.../services/PollService` - poll creation and voting logic
- `src/main/java/.../model/Poll` and `model/OptionVote` - JPA entities/value objects
- `src/main/java/.../repositories/PollRepository` - persistence layer
- `src/main/java/.../request/Vote` - request payload for voting

## Prerequisites

1. JDK version matching `pom.xml` (`java.version` is currently `26`)
2. MySQL Server running on `localhost:3306`
3. A database created for this app

## Database setup

Create the database:

```sql
CREATE DATABASE `voting-app`;
```

Set the database password in your environment before running the app:

PowerShell:

```powershell
$env:DB_PASSWORD="your_mysql_root_password"
```

`src/main/resources/application.properties` uses:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/voting-app
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
```

## Run the full stack locally

1. Start the backend API (from project root):

```powershell
.\mvnw.cmd spring-boot:run
```

Backend base URL: `http://localhost:8080`

2. Start the frontend app (in a second terminal):

```powershell
cd .\poll-app
npm install
npm start
```

Frontend URL: `http://localhost:4200`

> Ensure the frontend API configuration points to `http://localhost:8080`.

## API endpoints

### Create poll

`POST /api/polls`

Request body:

```json
{
  "question": "What should we build next?",
  "options": [
    { "voteOption": "Feature A", "voteCount": 0 },
    { "voteOption": "Feature B", "voteCount": 0 }
  ]
}
```

### Get all polls

`GET /api/polls`

### Get poll by id

`GET /api/polls/{id}`

Returns `404 Not Found` when the poll does not exist.

### Vote on a poll option

`POST /api/polls/vote`

Request body:

```json
{
  "pollId": 1,
  "optionIndex": 0
}
```

## Common errors

- `Communications link failure`: MySQL server is not running or wrong host/port.
- `Unknown database 'voting-app'`: create the database first.
- `405 Method Not Allowed` on `/api/polls`: use the correct HTTP method for the endpoint.
