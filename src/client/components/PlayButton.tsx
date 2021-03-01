import React from 'react';
import { ClientState } from '@common/client';
import { observer } from 'mobx-react-lite';
import SpeechifyClient from '../speechify';

type Props = {
  client: SpeechifyClient;
};

export const PlayButton = observer(({ client }: Props) => {

  const STATE_MAP = {
    [ClientState.PLAYING]: 'Pause',
    [ClientState.NOT_PLAYING]: 'Play'
  }

  return <button className="main-control" onClick={() => client.togglePlayback()}>
      { STATE_MAP[client.getState()] }
  </button>
});
