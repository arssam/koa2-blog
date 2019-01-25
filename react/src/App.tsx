import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Hello from '@/components/Hello'
import Login from '@/containers/login'
import UserCenter from '@/containers/user/center'

import './App.less';


const App = () => (
  <Router>
    <div>
      {/* exact控制匹配到/路径时不会再继续向下匹配，path标识路由的路径，component表示路径对应显示的组件 */}
      <Route path="/" exact component={Hello} />
      <Route path="/user/center" component={UserCenter} />
      <Route path="/login/" component={Login} />
    </div>
  </Router>
)

export default App