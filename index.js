import express from "express";
import request from "request-promise";

const app = express();
const PORT = process.env.PORT || 5000;

const generateApiKey = (api_key) =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ anna: "safina", kahava: "C.E.O" });
});

//Get prodect Details

app.get("/products/:productId", async (req, res) => {
  const { api_key } = req.query;
  const { productId } = req.params;
  try {
    const response = await request(
      `${generateApiKey(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get Product Reviews

app.get("/products/:productId/reviews", async (req, res) => {
  const { api_key } = req.query;
  const { productId } = req.params;
  try {
    const response = await request(
      `${generateApiKey(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get Products offers
app.get("/products/:productId/offers", async (req, res) => {
  const { api_key } = req.query;
  const productId = req.params;
  try {
    const response = await request(
      `${generateApiKey(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//Get Search Results

app.get("/search/:searchQuery", async (req, res) => {
  const api_key = req.query;
  const { searchQuery } = req.params;
  try {
    const response = await request(
      `${generateApiKey(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}`)
);
