import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.json({ status: "ok", code: 200 });
})

app.listen(3000, () => {
    console.log(`App corriendo en el puerto ${3000}`)
})