import React from 'react';
import Games from '../Games';
import renderer from 'react-test-renderer';

jest.mock('../GamePreview', () => 'GamePreview');

it('Game props is an array of 2 valid objects. Snapshot', () => {
    const game1 = {
        id: 1,
        name: 'dummyName1',
        logoUrl: 'dummyLogoUrl1'
    }

    const game2 = {
        id: 2,
        name: 'dummyName2',
        logoUrl: 'dummyLogoUrl2'
    }

    const tree = renderer.create(<Games games={[game1, game2]} />).toJSON();
    expect(tree).toMatchSnapshot();
});