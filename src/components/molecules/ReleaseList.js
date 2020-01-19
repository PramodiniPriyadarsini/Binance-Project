import React, { memo } from "react";
import PropTypes from 'prop-types';
import { List, Paper } from "@material-ui/core";
import ReleaseListItem from "./ReleaseListItem";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const ReleaseList = memo(props => (
     <>
      {props.items && props.items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "none" }}>
            {props.items.map((release, idx) => (
              <ReleaseListItem
                {...release}
                key={`TodoItem.${idx}`}
                divider={idx !== props.items.length - 1}
                onButtonClick={() => props.onItemRemove(idx)}
                onCheckBoxToggle={() => props.onItemMark(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  ));
  ReleaseList.propTypes = { 
    items: PropTypes.array.isRequired,
    onItemMark: PropTypes.func.isRequired,
    onItemRemove: PropTypes.func.isRequired,
    banner:  PropTypes.object.isRequired
  };
  
  export default ReleaseList;