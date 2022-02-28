import React from "react";

// Destructure the onUpdateItem prop
function Item({ item, onUpdateItem, onDeleteItem }) {
  //Add function to handle button click
  // add fetch
  function handleAddToCartClick(){
    // Call onUpdateItem, passing data returned form Fetch
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      })
    })
      .then(resp => resp.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
  }
    function handleDeleteClick() {
      fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
    // call onDeleteItem and pass the deleted item
    .then(resp => resp.json())
    .then(() => onDeleteItem(item));
    }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/* add onClick listener */}
      <button className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      {/* add onClick for Delete */}
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
