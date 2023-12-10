# MovieApp

## Set up

1) Copy .env.example into .env file and fill the blanks
2) Install npm packgages in client and in server folder
3) run `docker-compose build --no-cache` from the root folder
4) run `docker-compose up -d` from the root folder
5) Navigate to `localhost:${PORT}` to access the frontend or to `localhost:${SERVER_PORT}/graphql` to access the server

## Testing

1) RUN `cd server` from root folder
2) RUN `npm run test`

## App

1) Search for a movie
<img width="1063" alt="Screenshot 2023-12-10 at 15 49 30" src="https://github.com/Petiazediter/MovieApp/assets/49650243/d895aff7-fb9c-4e54-87d5-fd9f911ba44f">
2) If it's not cached the server will pull fresh data from the API
<img width="1023" alt="Screenshot 2023-12-10 at 15 49 50" src="https://github.com/Petiazediter/MovieApp/assets/49650243/bce7c06a-29d0-404d-ae33-376cf85a1e89">
3) Otherwise the server will returned the cached data from the DB 
<img width="1049" alt="Screenshot 2023-12-10 at 15 49 37" src="https://github.com/Petiazediter/MovieApp/assets/49650243/9a9bf36c-8c8c-43d8-995f-bbb52980cda2">
