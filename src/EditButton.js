import React from 'react';

const EditButton = ({ dispatch, visible }) => {
  return (
    <button
      className={visible ? 'waves-effect waves-light btn' : 'hide'}
      onClick={event => {
        let cellValue = event.target.closest('td').attributes['cellvalue']
          .nodeValue;
        let cellKey = event.target.closest('td').attributes['cellkey']
          .nodeValue;
        let newCellValue =
          prompt('Please enter a new value:', cellValue) || parseInt(cellValue);

        newCellValue = parseInt(newCellValue);

        while (isNaN(newCellValue) || typeof newCellValue === 'string') {
          newCellValue = parseInt(
            prompt(
              'Not a valid number. Please enter an integer value',
              cellValue
            )
          );
        }

        dispatch({
          type: 'updateProductValue',
          payload: { index: cellKey, value: newCellValue }
        });

        if (newCellValue !== parseInt(cellValue)) {
          dispatch({
            type: 'displaySaveButton',
            payload: true
          });
        }
      }}
    >
      Click to edit
    </button>
  );
};

export default EditButton;
