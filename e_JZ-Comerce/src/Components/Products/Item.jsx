const Item  = ({ product }) => {
  return (
    <div className="item">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
    );
};

export default Item;

