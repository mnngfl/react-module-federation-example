import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Modal from './components/Modal';
import NoMatch from './components/NoMatch';

const RemotePage = React.lazy(() => import('rmf_child/App'));
const RemoteModal = React.lazy(() => import('rmf_child/Modal'));

function App() {
  const [showModal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!showModal);
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/remote">Remote page</Link>
          </li>
          <li>
            <button onClick={() => handleModal()}>
              Open modal
            </button>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/remote">
            <React.Suspense fallback="remote app loading">
              <RemotePage />
            </React.Suspense>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>

        {
          showModal && 
          <React.Suspense fallback="modal loading">
            <Modal close={() => handleModal(false)}><RemoteModal /></Modal>
          </React.Suspense>
        }
      </div>
    </Router>
  )
}

export default App;