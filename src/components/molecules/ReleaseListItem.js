import React, { memo, useState } from "react";
import { 
  ListItem,
  Checkbox,
  IconButton,
  ListItemText 
} from "@material-ui/core";
import PropTypes from 'prop-types'; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles'; 
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Constants as C } from '../../constants/constants'
/**
 * 
 */
const GreenCheckbox = withStyles({
  root: {
    color: '#0000000d',
    border: '0px 0px', 
    '&$checked': {
      color: '#19ad20b5',
      padding: '0'
    } 
  },
  checked: {},
})(props => <Checkbox color="default" {...props} 
            icon={<CheckBoxOutlineBlankIcon className="checkboxOutline" style={{ border: '2px ridge #0000001c', borderRadius: ".2em", background: 'orange'}} />}
            checkedIcon={<CheckBoxIcon style={{ width: '1.5em', height: '1.5em', padding: '5px'}}/>} 
/>); 

const ReleaseListItem = memo((props) => {
  const [show, showIcon] = useState(false); 
  return (
    <ListItem className={'listItem'} divider={props.divider} button >
       <FormControlLabel
          className={'greenCheckBox'}
          control={
            <GreenCheckbox 
              checked={props.checked}  
              onClick={props.onCheckBoxToggle}
            />
          } 
        /> 
      <ListItemText className={props.checked ? 'strikeThrough' : ''} primary={props.text} onMouseLeave={() => showIcon(false)} onMouseEnter={() => showIcon(true)} />
      {
        show ? (<IconButton className="checkBoxWrap" onMouseEnter={() => showIcon(true)} onMouseLeave={() => showIcon(false)}  color='primary' aria-label="Delete Todo" onClick={props.onButtonClick} >
          <SvgIcon viewBox="0 0 21 23" className="checkBoxSvg">
            <path d={C.TRASH_SVG_PATH}/>
            </SvgIcon>
        </IconButton>) : ''
      }    
    </ListItem>
  ) 
});

ReleaseListItem.propTypes = {  
  divider: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onCheckBoxToggle:  PropTypes.func.isRequired
};

export default ReleaseListItem;
