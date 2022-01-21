import React, { useState } from "react";

import PropTypes from "prop-types";

AddProductForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddProductForm({ onSubmit = null }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [content, setContent] = useState("");

  const handleChangeInputName = (e) => {
    setName(e.target.value);
  };

  const handleChangeInputAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleChangeInputContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    const formValues = {
      name: name,
      avatar: avatar,
      content: content,
    };
    onSubmit(formValues);
    setContent("");
    setName("");
    setAvatar("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field-input-group">
        <input
          value={avatar}
          onChange={handleChangeInputAvatar}
          placeholder="Image"
          type="text"
          className="ant-input"
        />
      </div>
      <div className="field-input-group">
        <input
          value={name}
          onChange={handleChangeInputName}
          placeholder="Product name"
          type="text"
          className="ant-input"
        />
      </div>
      <div className="field-input-group">
        <input
          value={content}
          onChange={handleChangeInputContent}
          placeholder="Product description"
          type="text"
          className="ant-input"
        />
      </div>
      <div className="modal-new-user-footer">
        <button
          type="submit"
          className="ant-btn ant-btn-primary"
          onSubmit={handleSubmit}
        >
          Save
        </button>
        {/* <button className="ant-btn" style={{ marginLeft: 10 }}>
          Cancel
        </button> */}
      </div>
    </form>
  );
}

export default AddProductForm;
