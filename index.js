const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let products = [
    { 
        name: "TV", 
        brand: "Samsung",
        price_rupees: 34999
    },
    { 
        name: "Refrigerator", 
        brand: "LG",
        price_rupees: 25999
    }
];

let productIds = products.map((item, index) => index);

app.get("/products", (req, res) => {
    res.status(200).json({ message: "Products read successfully", data: products });
});

app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const numericId = parseInt(id);
    if (!productIds.includes(numericId)) {
        return res.status(404).json({ message: "Product not found!" });
    }
    const product = products[numericId];
    res.status(200).json({ message: "Product read successfully", data: product });
});

app.post("/products", (req, res) => {
    const { name, brand, price_rupees } = req.body;
    const id = products.length;
    const newProduct = { name: name, brand: brand, price_rupees: price_rupees };
    products.push(newProduct);
    productIds.push(id);
    res.status(201).json({ message: "Product created successfully", data: newProduct });
});

app.patch("/products/:id", (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const numericId = parseInt(id);
    if (!productIds.includes(numericId)) {
        return res.status(404).json({ message: "Product not found!" });
    }
    products[numericId] = { ...products[numericId], ...newData };
    res.status(200).json({ message: "Product updated successfully", data: products[numericId] });
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const numericId = parseInt(id);
    if (!productIds.includes(numericId)) {
        return res.status(404).json({ message: "Product not found!" });
    }
    products.splice(numericId, 1);
    productIds.splice(productIds.indexOf(numericId), 1);
    res.status(200).json({ message: "Product removed successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
});
