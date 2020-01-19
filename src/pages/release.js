import React, { memo, useContext, useState, Suspense, lazy } from "react";   
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles';
import Store from '../store/localContext' ;
import { Constants as C } from '../constants/constants'; 
import { ReleaseHelper as H } from '../util/utils'; 
import Layout from '../components/organisms/Layout';
import AddRelease from '../components/molecules/AddRelease';
import ReleaseList from '../components/molecules/ReleaseList'; 
const Notification = lazy(() => import('../components/molecules/Notification'));   

const onReleaseClick = (initialValue = false) => {
  const [isOpen, triggerOpen] = useState(initialValue); 
  return {
    isOpen,
    openReleaseList: () => triggerOpen(!isOpen) 
  };
};

const customTheme = createMuiTheme({
  typography: {
   "fontFamily": C.DEFAULT_THEME_FONT 
  }
}); 
/**
 * @example
 *    <ReleaseApp />
 */
const ReleaseApp = memo(() => {
  const { state, dispatch } = useContext(Store); 
  const [ release, setRelease] = useState("");
  const [ message, notify ] = useState("");
  const { isOpen, openReleaseList } = onReleaseClick();  

  const handleReleaseChange = (e) => {
    /**update the string to current state*/
    setRelease(e && e.target && e.target.value);
  }

  const removeRelease = (idx) => { 
    /**dispatch delete event along with the index*/
    dispatch({ type: C.DELETE, payload: idx });
    /**trigger notification to the end user*/
    notify({"type": C.WARNING, "msg": C.TODO_REMOVED_MESSAGE}) 
  }

  const markRelease = (idx) => {  
    /**dispatch completed/mark event along with the index*/
    dispatch({ type: C.COMPLETE, payload: idx });
    /**trigger notification to the end user*/
    notify({"type": C.INFO, "msg": C.TODO_MARK_MESSAGE}) 
  }

  const handleReleaseAdd = () => {
    if(H.handleInput(release)) {
      /**dispatch add project event along with the string*/
      dispatch({ type: C.ADD_TODO, payload: release });
      /**empty the addtodo block*/
      setRelease(""); 
      /**toggling the project text block*/
      openReleaseList(false);
      /**trigger notification to the end user*/
      notify({"type": C.SUCCESS, "msg": C.TODO_SUCCESS_MESSAGE})
    }
    else {
      /**trigger notification to the end user*/
      notify({"type": C.ERROR, "msg": C.ERROR_MESSAGE})
    }  
  } 

  const handleKeyPressEvent = (ev) => {
    /**handle keypress event based on the keyboard key */
    if(H.handleKeyPress(ev)) {
      handleReleaseAdd();
    } else {
      return false
    }
  }

  return ( 
    <div className={'wrapper'}>
      <MuiThemeProvider theme={customTheme}> 
          <Layout project={C.PROJECT_OBJ}> 
            <ReleaseList
              items={state && state.releases}
              onItemMark={idx => markRelease(idx)}
              onItemRemove={idx => removeRelease(idx)} 
              banner={C.BANNER_OBJ}
            />
            <AddRelease
              inputValue={release}
              onInputChange={handleReleaseChange}
              onButtonClick={handleReleaseAdd}
              openRelease={() => openReleaseList()}
              isOpen={isOpen}
              onInputKeyPress={ev => handleKeyPressEvent(ev)}
            /> 
            {message ? 
              <Suspense fallback={<div></div>}>
                <Notification
                  variant={message && message.type} 
                  onClose={() => notify("")}
                  message={message.msg}
                />
              </Suspense>
               : 
              ''
            }
          </Layout> 
        </MuiThemeProvider>
    </div> 
  );
}); 


export default ReleaseApp;
 
