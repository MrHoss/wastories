import { useState } from 'react';

function Versions(): JSX.Element {
  const [appVersion] = useState(window.appVersion);

  return (
    <ul className="versions">
      <li className="electron-version">WAStories {appVersion}</li>
    </ul>
  );
};

export default Versions;
