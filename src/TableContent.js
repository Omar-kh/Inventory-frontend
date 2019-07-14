import React from 'react';
import CellContent from './CellContent';

const TableContent = ({ product, dispatch, displayOptions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {product.dates.map((date, ind) => {
          return (
            <tr key={ind}>
              <td key={date}>{date}</td>
              <td
                key={ind}
                cellvalue={product.values[ind]}
                cellkey={ind}
                onMouseEnter={event => {
                  dispatch({
                    type: 'displayEditButton',
                    payload: {
                      display: true,
                      currCell: event.target.closest('td').attributes.cellkey
                        .nodeValue
                    }
                  });
                }}
                onMouseLeave={event => {
                  dispatch({
                    type: 'displayEditButton',
                    payload: {
                      display: false,
                      currCell: null
                    }
                  });
                }}
              >
                <CellContent
                  content={product.values[ind]}
                  displayOptions={displayOptions}
                  cellKey={ind}
                  dispatch={dispatch}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableContent;
