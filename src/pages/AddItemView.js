import React, { useState } from "react";
import { firestore } from "../firebase";


const AddItemView = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [flavor, setFlavor] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");

  const addProduct = async () =>{
      let product = {
          name,
          price,
          flavor,
          description,
          productType
      }
      let docRef = await firestore.collection('products').add(product);
      console.log(docRef);
  }
  return (
    <div className="add-item-view">
      <form action="" onSubmit={(e) => {
          e.preventDefault();
          addProduct()}}>
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="">Product Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label htmlFor="">Product Description</label>
        <textarea
          rows="4"
          cols="50"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label htmlFor="">Product Type</label>
        <input
          type="text"
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
          }}
        />
        <label htmlFor="">Product Flavor</label>
        <input
          type="text"
          value={flavor}
          onChange={(e) => {
            setFlavor(e.target.value);
          }}
        />
        <input type="submit" value="Add Product" className="btn"/>
      </form>
    </div>
  );
};

export default AddItemView;
