
// export default Products;
function Products({ item, addItemToCart }) {
  const handleAddToCart = (e) => {
    // Stop the click event from propagating to the parent Link component
    e.stopPropagation();
    // Ensure item data contains necessary details (e.g., title, price, etc.)
    addItemToCart(item);
  };

  return (
    <>
      <div className="mt-5 my-3 p-2">
        <div className="card bg-base-96 w-96 shadow-xl hover:scale-110 duration-150">
          <figure>
            <img
              src={item.image}
              alt={item.name} // Changed alt text to the product name
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge bg-green-500 text-white">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline bg-green-600 text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                ${item.price}
              </div>

              {/* Add to Cart button */}
              <button
                className="badge badge-outline bg-gray-100 text-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 mt-4"
                onClick={(e) => {
                  // Stop propagation to avoid triggering Link navigation
                  e.stopPropagation();
                  // Add item to cart
                  addItemToCart(item.name, item.price, item.category, item.image, item.title);
                }}
              >
                See Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;