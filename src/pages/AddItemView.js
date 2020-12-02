import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore, storage } from '../firebase';

const AddItemView = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [flavor, setFlavor] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  let imageInput = null;
  const history = useHistory();

  const addProduct = async () => {
    try {
      let product = {
        name,
        price,
        flavor,
        description,
        productType,
      };
      let docRef = await firestore.collection('products').add(product);
      console.log(docRef);
      if (getFile()) {
        let productDoc = await docRef.get();
        storage
          .ref()
          .child('products')
          .child(productType)
          .child(`${productDoc.id}`)
          .put(getFile())
          .then((res) => res.ref.getDownloadURL())
          .then((image) => docRef.update({ image }));
      }
    } catch (error) {}
  };

  const getFile = () => {
    return imageInput && imageInput.files[0];
  };
  return (
    <div className="add-item-view">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          addProduct();
        }}
        required
      >
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <label htmlFor="">Product Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
        />
        <label htmlFor="">Product Description</label>
        <textarea
          rows="4"
          cols="50"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        />
        <label htmlFor="">Product Type</label>
        <input
          type="text"
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
          }}
          required
        />
        <label htmlFor="">Product Flavor</label>
        <input
          type="text"
          value={flavor}
          onChange={(e) => {
            setFlavor(e.target.value);
          }}
          required
        />
        <input
          type="file"
          name=""
          id=""
          ref={(ref) => (imageInput = ref)}
          required
        />
        <input type="submit" value="Add Product" className="btn" />
      </form>
    </div>
  );
};

export default AddItemView;
