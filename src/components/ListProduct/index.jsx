import React from "react";
import PropTypes from "prop-types";

ListProduct.propTypes = {
  datas: PropTypes.array,
  onProductListDelete: PropTypes.func,
  onProductListEdit: PropTypes.func,
};

function ListProduct({
  datas = [],
  onProductListEdit = null,
  onProductListDelete = null,
}) {
  const handleProductListEdit = (data, index) => {
    if (!onProductListDelete) return;
    onProductListEdit(data, index);
  };

  const handleProductListDelete = (data, index) => {
    if (!onProductListDelete) return;
    onProductListDelete(data, index);
  };

  return (
    <div>
      {datas.map((data, index) => (
        <div key={data.id}>
          <div className="ant-list-items">
            <div className="ant-list-item">
              <div className="ant-list-item-meta">
                <div>
                  <div className="ant-list-item-meta-avatar">
                    <span className="ant-image-img">
                      <img src={data.avatar} style={{ width: 100 }} />
                    </span>
                  </div>
                  <div className="ant-list-item-meta-content">
                    <h4 className="ant-list-item-meta-title">
                      <a>{data.name}</a>
                    </h4>
                    <div className="ant-list-item-meta-description">
                      {data.content}
                    </div>
                  </div>
                </div>
                <ul className="ant-list-item-action">
                  <li>
                    <a onClick={() => handleProductListEdit(data, index)}>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleProductListDelete(data, index)}>
                      Remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListProduct;
