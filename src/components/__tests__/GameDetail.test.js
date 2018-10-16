import React from 'react';
import GameDetail from '../GameDetail';
import renderer from 'react-test-renderer';
import moment from 'moment';

it('All props are defined. Snapshot', () => {
    const game = {
        name: 'dummyName',
        logoUrl: 'dummyLogoUrl'
    } 

    const gameRun = {
        playerName: 'dummyPlayerName',
        videoUrl: 'dummyVideoUrl',
        duration: moment.duration(3, 'minute')
    }

    const tree = renderer.create(<GameDetail game={game} lastRun={gameRun} />).toJSON();
    expect(tree).toMatchSnapshot();
});