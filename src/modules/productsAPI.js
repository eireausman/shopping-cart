const allProductsFetch = async () => {
  const fetchedData = await fetch("https://fakestoreapi.com/products");
  const finalData = await fetchedData.json();

  return await finalData;
};

const singleProductFetch = async (productID) => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  const fetchedData = await fetch(url);
  const finalData = await fetchedData.json();
  return await finalData;
};

export { allProductsFetch, singleProductFetch };
