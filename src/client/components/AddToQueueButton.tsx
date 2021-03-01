import React, { useState } from 'react';
import { DataType } from '@common';
import DataGenerator from '../generator';
import SpeechifyClient from '../speechify';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react-lite';

type Props = {
  type: DataType;
  generator: DataGenerator;
  client: SpeechifyClient;
};

export const AddToQueueButton = observer(({ type, generator, client }: Props) => {
  const [queue, setQueue] = useState(Array<string>());
  const isLoading = queue.find(id => !client.getLoaded.get(id));

  const onClick = async () => {
    const id = uuidv4();
    const data = generator.getData(type);
    setQueue([...queue, id]);
    client.addToQueue(id, data);
  };

  return (
    <div onClick={onClick} className="add-to-queue-button">
      {isLoading ? 'Submitting...' : `Add ${type} Data to Queue`}
    </div>
  );
});
