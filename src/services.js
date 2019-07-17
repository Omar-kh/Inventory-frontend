import Axios from 'axios';

const get = async url => {
  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const put = async (url, data) => {
  try {
    const response = await Axios.put(url, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function getProducts(dispatch) {
  const productList = await get('http://localhost:5000/inventory');
  dispatch({
    type: 'setProductList',
    payload: productList
  });
}

export async function getProductInfo(productId, dispatch) {
  const productInfo = await get(`http://localhost:5000/inventory/${productId}`);
  dispatch({
    type: 'setProductInfo',
    payload: productInfo
  });
}

export async function sendInfo(productInfo, dispatch) {
  const { product_id } = productInfo;
  await put(`http://localhost:5000/inventory/${product_id}`, productInfo);
  dispatch({
    type: 'setProductInfo',
    payload: productInfo
  });
}

export const makeChartData = (infoIsLoaded, info) => {
  const data = {};

  if (infoIsLoaded) {
    const { dates } = info;
    const { values } = info;
    for (let i = 0; i < dates.length; i++) {
      data[dates[i]] = values[i];
    }
  }

  return data;
};
