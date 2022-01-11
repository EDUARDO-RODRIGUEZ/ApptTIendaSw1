import React from 'react'
import AuthContextProvider from './src/context/authContext'
import Navition from './src/navigation/Navition'
import { LogBox } from 'react-native';


const App = () => {

  return (
    <AuthContextProvider>
      <Navition />
    </AuthContextProvider>
  )

}

LogBox.ignoreAllLogs();
export default App
