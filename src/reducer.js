const reducer = (state, action) => {
  switch (action.type) {
    case 'setProductList':
      return { ...state, productList: action.payload };
    case 'setProductInfo':
      return { ...state, productInfo: action.payload };
    case 'displayEditButton':
      return {
        ...state,
        editButtonDisplay: action.payload
      };
    case 'updateProductValue':
      let updatedProductInfo = state.productInfo;
      let valuePosition = action.payload.index;
      updatedProductInfo.values[valuePosition] = action.payload.value;
      return { ...state, productInfo: updatedProductInfo };
    case 'displaySaveButton':
      return { ...state, displaySaveButton: action.payload };
    default:
      throw new Error();
  }
};

export default reducer;
