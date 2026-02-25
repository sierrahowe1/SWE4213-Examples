const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const INVENTORY_URL = process.env.INVENTORY_URL || "http://localhost:3000";
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

// In-memory order store
const orders = [];
let nextOrderId = 1;
let channel = null; // RabbitMQ channel — set up in main()

// POST /orders — place a new order
app.post("/orders", async (req, res) => {
  const { itemId, quantity, customerName } = req.body;

  if (!itemId || !quantity || !customerName) {
    return res.status(400).json({ error: "itemId, quantity, and customerName are required" });
  }

  try {
    // TODO (Part 2): Call the inventory service to reserve stock.
    //
    // Make a PUT request to: `${INVENTORY_URL}/items/${itemId}/reserve`
    // with a JSON body: { quantity }
    //
    // Use the built-in fetch() function:
    //   const response = await fetch(___, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ quantity }),
    //   });
    //
    // If the response is not ok, read the error and throw it so the catch
    // block returns it to the client:
    //   if (!response.ok) {
    //     const err = await response.json();
    //     throw new Error(err.error || "Inventory reservation failed");
    //   }

    // Build and store the confirmed order
    const order = {
      id: nextOrderId++,
      itemId,
      quantity,
      customerName,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    orders.push(order);

    // TODO (Part 3): Publish an "order.placed" event to RabbitMQ.
    //
    // Send the order object as a JSON message to the "order.placed" queue:
    //   channel.sendToQueue("order.placed", Buffer.from(JSON.stringify(order)));
    //
    // Add a console.log so you can see when events are published.

    res.status(201).json(order);
  } catch (err) {
    console.error("Order failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /orders — list all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

async function connectWithRetry(url, retries = 10, delay = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      return await amqp.connect(url);
    } catch (err) {
      console.log(`RabbitMQ not ready, retrying (${i}/${retries})...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Could not connect to RabbitMQ after retries");
}

async function main() {
  // TODO (Part 3): Connect to RabbitMQ and store the channel.
  //
  // 1. Connect:   const connection = await connectWithRetry(RABBITMQ_URL);
  // 2. Channel:   channel = await connection.createChannel();
  // 3. Assert queue: await channel.assertQueue("order.placed", { durable: false });
  // 4. Log success: console.log("Connected to RabbitMQ");

  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
}

main().catch(console.error);
