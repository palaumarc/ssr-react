import React from 'react';
import Layout from '../Layout';
import renderer from 'react-test-renderer';

jest.mock("react-router-dom")

it('All props are defined. Snapshot', () => {
  const tree = renderer
    .create(<Layout />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});