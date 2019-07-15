import React, { useEffect, useReducer } from 'react';
import { getProducts, getProductInfo, sendInfo } from './services';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import Select from 'react-select';
import TableContent from './TableContent';
import reducer from './reducer';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const initialState = {
  productList: [],
  productInfo: {},
  editButtonDisplay: {
    display: false,
    currCell: null
  },
  displaySaveButton: false
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setProductList', payload: 'loading' });
    getProducts(dispatch);
  }, []);

  let data = {};

  if (
    typeof state.productInfo === 'object' &&
    Object.keys(state.productInfo).length > 0
  ) {
    let productDates = state.productInfo.dates;
    let productValues = state.productInfo.values;
    for (let i = 0; i < productDates.length; i++) {
      data[productDates[i]] = productValues[i];
    }
  }

  return (
    <div className="container">
      <h1 className="center-align section blue-text">
        Inventory Monitoring App
      </h1>
      <h4 className="center-align section teal-text">
        Select the product you want to monitor
      </h4>
      {state.productList === 'loading' && <h2>Loading...</h2>}
      {typeof state.productList !== 'string' && state.productList.length > 0 && (
        <div className="section">
          <Select
            onChange={event => getProductInfo(event.value, dispatch)}
            options={state.productList.map(product => ({ value: product.product_id, label: product.product_id }))}
          />
        </div>
      )}
      {typeof state.productInfo === 'object' &&
        Object.keys(state.productInfo).length > 0 && (
          <div className="row section">
            <h5 className="center-align section teal-text">
              {state.productInfo.product_name}
            </h5>
            <div className="center-align">
              <button
                className={
                  state.displaySaveButton
                    ? 'waves-effect waves-light btn'
                    : 'hide'
                }
                onClick={() => {
                  sendInfo(state.productInfo, dispatch);
                  dispatch({ type: 'displaySaveButton', payload: false });
                }}
              >
                Save
              </button>
            </div>
            <div className="col l3 m3 s12 half-screen-length scrollable">
              <TableContent
                product={state.productInfo}
                dispatch={dispatch}
                displayOptions={state.editButtonDisplay}
              />
            </div>
            <div className="col l9 m9 s12 section half-screen-length valign-wrapper">
              <LineChart data={data} />
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
