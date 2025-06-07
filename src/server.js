const express = require("express");
const cors = require('cors');

const routerUser = require("./routes/users.route");
const { routerAuth } = require("./routes/auth.routes");
const routerProduct = require("./routes/product.routes");
const { routerCategory } = require("./routes/category.routes");
const { routerOrder } = require("./routes/order.routes");
const { routerOrderItem } = require("./routes/orderItem.routes");
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // ou o domínio do seu frontend
  credentials: true
}));

app.use(routerUser);
app.use(routerAuth);
app.use(routerProduct);
app.use(routerCategory);
app.use(routerOrder);
app.use(routerOrderItem);

app.listen(3333, () => {
    console.log("Server is running ...")
})

