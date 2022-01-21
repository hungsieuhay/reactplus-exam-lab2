import { Input, Modal } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import AddProductForm from "./components/AddProductForm";
import ListProduct from "./components/ListProduct";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    fetch("https://5d36d86c86300e0014b647c7.mockapi.io/products")
      .then((res) => res.json())
      .then((items) => {
        console.log(items);
        setItem(items);
      });
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (formValues) => {
    console.log("Form submit:", formValues);
    const newItem = {
      id: item.length + 1,
      ...formValues,
    };
    const newItemList = [...item];
    newItemList.push(newItem);
    setItem(newItemList);
    setIsModalVisible(false);
  };

  const handleDelete = (index) => {
    if (index < 0) return;
    index = item.findIndex((x) => x.id === item.id);
    const newItemList = [...item];
    newItemList.splice(index, 1);
    setItem(newItemList);
  };

  const handleEdit = (data, index) => {
    console.log(data, index);
    setIsEditing(true);
    setEditingProduct({ ...data });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };
  return (
    <div className="App">
      <h2>List product</h2>
      <div className="header-add-user">
        <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
          Add New Product
        </button>
      </div>
      <ListProduct
        datas={item}
        onProductListDelete={handleDelete}
        onProductListEdit={handleEdit}
      />
      <Modal
        title="Add Product"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <AddProductForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal
        title="Edit products"
        visible={isEditing}
        okText="Update"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setItem((pre) => {
            return pre.map((item) => {
              if (item.id === editingProduct.id) {
                return editingProduct;
              } else {
                return item;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editingProduct?.avatar}
          onChange={(e) => {
            setEditingProduct((pre) => {
              return { ...pre, avatar: e.target.value };
            });
          }}
        />
        <Input
          value={editingProduct?.name}
          onChange={(e) => {
            setEditingProduct((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingProduct?.content}
          onChange={(e) => {
            setEditingProduct((pre) => {
              return { ...pre, content: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
