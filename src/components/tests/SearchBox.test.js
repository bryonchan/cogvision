import React from 'react';
// import Link from '../Link.react';
import SearchBox from '../SearchBox';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SearchBox placeholder="Search..."></SearchBox>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});