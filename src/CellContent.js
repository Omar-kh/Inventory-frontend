import React from 'react';
import EditButton from './EditButton';

const CellContent = ({ content, displayOptions, cellKey, dispatch }) => {
  let { display, currCell } = displayOptions;
  let buttonVisible = display && currCell === '' + cellKey;
  return (
    <div>
      <p className={buttonVisible ? 'hide' : ''}>{content}</p>
      <EditButton visible={buttonVisible} dispatch={dispatch} />
    </div>
  );
};

export default CellContent;
