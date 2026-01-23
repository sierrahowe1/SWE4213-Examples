# Activity 3: Learning Express 
The goal of this activity is to get experience building an API with Express.js.

## Activity 3.1 - Create Hello World Express App

**Todo 1:** Initialize your project.

`npm init –y`

**Todo 2:** Install express.

`npm i express`

**Todo 3:** Create a server.js file. This is the entrypoint into your API. Note this could be called whatever you want. 

**Todo 4:** Install nodemon as a dev dependency. Installing it as a dev dependency means it won't get built into the project when you go to deploy it. Nodemon makes our lives much easier by enabling live reloading during development. 

`npm i --save-dev nodemon`

**Todo 5:** Add a script to package.json so that you can easily run your project using nodemon. 

```JSON
{
  "name": "activity3",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

**Todo 6:** In `server.js` create an express app and return `Hello World!` when people hit the `/` endpoint. You should serve your api at port 3000.

<details>
  <summary>Reveal Answer</summary>

```JS
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port)
```
</details>
<br>

## Activity 3.2 - Create Products Endpoint 
Imagine we are creating a buy and sell application. We probably want an endpoint for `products/`. This might include the following information:
- id
- title 
- price 
- condition
- category
- description
- seller
- location
- isSold 
- createdAt

Your job is to create an app with two endpoints `/users` and `/products`. 

**Todo 1:** Replace your current `server.js` with the one in this folder. 

**Todo 2:** Create a `/routes` folder. This is where you are going to store your different routes. Copy the `users.js` file into your `/routes` folder. You should be able to access the `/users` endpoints. 

**Todo 3:** Copy the `products.js` file into your `/routes` folder. Your goal is to add the following endpoints.

`GET /products`

<details>
  <summary>Reveal Answer</summary>

```JS
router.get("/", (req, res) => {
    res.json(products);
});
```
</details>
<br>

`GET /products/:id` 

<details>
  <summary>Reveal Answer</summary>

```JS
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
});
```
</details>
<br>

`POST /products`

<details>
  <summary>Reveal Answer</summary>

```JS
router.post("/", (req, res) => {
    const { title, price, condition, category, description, seller, location } = req.body;

    if (!title || !price || !condition || !category || !description || !seller || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = {
        id: nextId++,
        title,
        price,
        condition,
        category,
        description,
        seller,
        location,
        isSold: false,
        createdAt: new Date().toISOString(),
    };
    products.push(newProduct);

    res.status(201).json(newProduct);
});
```
</details>
<br>

`DELETE /products` 

<details>
  <summary>Reveal Answer</summary>

```JS
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return res.status(404).json({ error: "Product not found" });

    const deleted = products.splice(index, 1)[0];
    res.json({ message: "Product deleted", deleted });
});
```
</details>
<br>

**Todo 4:** You can update your `server.js` to serve your new `/products` endpoint. 

<details>
  <summary>Reveal Answer</summary>

```JS
const productRouter = require("./routes/products");
app.use("/products", productRouter);
```
</details>
<br>

**Todo 5:** Test your endpoints with the following curl commands:

- `curl http://localhost:3000/products`
  
- `curl http://localhost:3000/products/1`
- `curl -i -X POST "http://localhost:3000/products" -H "Content-Type: application/json" -d '{"title":"AirPods Pro (2nd Gen)","price":180,"condition":"good","category":"Electronics","description":"Works great. Includes case and extra tips.","seller":"Ethan","location":"Fredericton, NB"}'`
- `curl -X DELETE http://localhost:3000/products/3`


## Activity 3.3 - Write Bruno tests 

**Todo 1:** Open the Bruno collection in the Bruno app. If you haven't yet downloaded it, download it here: `https://www.usebruno.com/downloads`

**Todo 2:** Run the collection for the `/users` endpoint. 

**Todo 3:** Create a subfolder in Activity3/Bruno to write the following tests for your products endpoint:

- `1 - GET products`
- `2 - GET products by id` 
- `3 - POST products` 
- `4 - DELETE product by id`