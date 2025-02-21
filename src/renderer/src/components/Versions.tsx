import Paper from '@renderer/@emotion-custom/Paper';
import { useState } from 'react';

function Versions(): JSX.Element {
  const [appVersion] = useState(window.appVersion);

  return (
    <Paper style={{ textAlign: 'center' }}>
      <ul>
        <li>WAStories {appVersion}</li>
      </ul>
    </Paper>
  );
};

export default Versions;
