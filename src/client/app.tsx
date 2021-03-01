import React from 'react';
import { DataType } from '@common';
import SpeechifyClient from './speechify';
import { PlayButton, AddToQueueButton } from './components';
import DataGenerator from './generator';

interface Props {
  client: SpeechifyClient;
  generator: DataGenerator;
}

export default function App(props: Props): JSX.Element {
  const DataTypes = [DataType.HTML, DataType.TXT, DataType.JSON];
  return (
    <>
      <h1>Speechify CarPlay</h1>
      <PlayButton client={props.client} />
      <div className="add-to-queue-buttons">
        {
          DataTypes.map(dataType => <AddToQueueButton
            client={props.client}
            generator={props.generator}
            type={dataType}
          />)
        }
      </div>
    </>
  );
}
