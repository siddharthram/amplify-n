
import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
//import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div> App
    </div>
  );
}


export default withAuthenticator(App, { includeGreetings: true });

