import * as React from 'react';
import * as ReactDOM from 'react-dom'
import Hello from '@/components/Hello'

import './App.less';

ReactDOM.render(
  <Hello name="sam" age={19} />,
  document.getElementById('app')
);