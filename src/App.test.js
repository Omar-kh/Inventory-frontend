import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer from './reducer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('test proper functionning of reducer', () => {
  it('should update the display of the edit button', () => {
    expect(
      reducer(
        {},
        { type: 'displayEditButton', payload: { display: true, currCell: 5 } }
      )
    ).toEqual({
      editButtonDisplay: {
        display: true,
        currCell: 5
      }
    });

    expect(reducer({}, { type: 'displaySaveButton', payload: true })).toEqual({
      displaySaveButton: true
    });
  });
});
