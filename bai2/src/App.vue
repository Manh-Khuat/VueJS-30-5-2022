<script setup lang="ts"></script>
<template>
  <div id="app">
    <form>
      <label for="id">Id Sản Phẩm</label>
      <input  v-model="id" type="text" id="id" name="id" placeholder="Id" />
      <label for="name">Tên Sản Phẩm</label>
      <input
        v-model="name"
        type="text"
        id="name"
        name="name"
        placeholder="Tên Sản Phẩm..."
      />
      <label for="price">Giá</label>
      <input
        type="text"
        id="price"
        name="price"
        placeholder="Giá Sản Phẩm..."
        v-model="price"
      />
      <label for="color">Màu Sắc</label>
      <input
        v-model="color"
        type="text"
        id="color"
        name="color"
        placeholder="Màu Sắc..."
      />
      <input @click="PostApi()" type="submit" value="Add Product" />
    </form>
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Color</th>
          <th>Action</th>
        </tr>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><input  type="text" v-model="product.name" /></td>
          <!-- <td>{{ product.name }}</td> -->
          <td>{{ product.price }}đ</td>
          <td>{{ product.color }}</td>
          <div class="buttons">
            <button @click="UpdateApi(product.id, product.name, product.price, product.color)">Update</button
            ><button @click="DeleteApi(product.id)" class="button1">
              Delete
            </button>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      products: [],
      id: "",
      name: "",
      price: "",
      color: "",
    };
  },
  methods: {
    async GetApi() {
      await axios
        .get("http://localhost:3000/products")
        .then((resp) => {
          JSON.parse((this.products = resp.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async PostApi() {
      await axios
        .post("http://localhost:3000/products", {
          id: this.id,
          name: this.name,
          price: this.price,
          color: this.color,
        })
        .then((resp) => {
          console.log(resp);
          this.GetApi();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async DeleteApi(id) {
      await axios
        .delete("http://localhost:3000/products/" + id)
        .then((resp) => {
          console.log(resp);
          this.GetApi();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async UpdateApi(id, name, price, color) {
      await axios
        .put("http://localhost:3000/products/" + id, {
          id: id,
          name: name,
          price: price,
          color: color
        })
        .then((resp) => {
          console.log(resp);
          this.GetApi();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.GetApi();
  },
};
</script>

<style scoped>
.title {
  border: none;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #04aa6d;
  color: white;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 12px;
}

.button1 {
  background-color: red; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  border-radius: 12px;
}

button:hover,
.button1:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

input[type="text"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
