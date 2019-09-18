# Movie Database

Simple movie database API

## Using API

### Routes

1.  POST http://movie-database-netguru.snuter.pl/api/movies/
    JSON body: title or imdbId - example below
    returns: { "success": true/false, "message": message, "movie_id": movie_id }

```
POST http://movie-database-netguru.snuter.pl/api/movies/
JSON: { "title": "Harry Potter" }
```

---

2.  GET http://movie-database-netguru.snuter.pl/api/movies/
    Query params: none - example below
    returns: { "success": true/false, "message": message, "data": movies }

```
GET http://movie-database-netguru.snuter.pl/api/movies/
```

---

3.  POST http://movie-database-netguru.snuter.pl/api/comments/
    JSON body: user_id (optional for testing), movie_id (optional for testing), text (required) - example below
    returns: { "success": true/false, "message": message, "comment_id": comment_id }

```
POST http://movie-database-netguru.snuter.pl/api/comments/
JSON: { "text": "That movie was absolutely  A W E S O M E" }
or
JSON: {
	"user_id": "5d82aa443c0daf0bfee8b761",
	"movie_id": "5d82aa9a3c0daf0bfee8b763"
	"text": "LoTR is the best movie of XXI century!"
}
```

---

4.  GET http://movie-database-netguru.snuter.pl/api/comments/
    Query params: none - example below
    returns { "success": true/false, "data": comments, "message": message }

```
GET http://movie-database-netguru.snuter.pl/api/movies/
```

---

5.  POST http://movie-database-netguru.snuter.pl/api/users/register
    JSON body: email (required), password (required) - example below

```
POST http://movie-database-netguru.snuter.pl/api/users/register
JSON: {
	"email": "my_super_email@gmail.com",
	"password": "my_Ultr4_s3cr3t-abs0lut3ly_n0t_h4ck4ble_p4ssw0rd"
}
```

---

6.  POST http://movie-database-netguru.snuter.pl/api/users/login
    JSON body: email (required), password (required) - example below

```
POST http://movie-database-netguru.snuter.pl/api/users/login
JSON: {
	"email": "my_super_email@gmail.com",
	"password": "my_Ultr4_s3cr3t-abs0lut3ly_n0t_h4ck4ble_p4ssw0rd"
}
```

### Installing API locally

You must have installed MongoDB. If you don't have it already check out this tutorial: [https://www.tutorialspoint.com/mongodb/mongodb_environment.htm](https://www.tutorialspoint.com/mongodb/mongodb_environment.htm)

1.  Clone this repo
2.  Run `npm install`
3.  Run MongoDB database by by going to MongoDB path, then `cd bin` and `mongod --dbpath="PATH_TO_YOUR_MONGO_DATA"`
4.  Run `node app`
5.  Now API is running on localhost:3000
6.  Now you can send requests with Postman
