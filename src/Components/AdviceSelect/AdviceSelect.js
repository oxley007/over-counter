import React, { Component } from 'react';
import './AdviceSelect.css';

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
/*
Material UI constants
*/
const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
button: {
  margin: theme.spacing.unit,
  backgroundColor: 'transparent',
  color: '#fff',
  width: '100%',
  borderColor: '#fff',
  borderRadius: '0px',
  borderRight: 'none',
  paddingRight: '0',
  paddingLeft: '0',
  marginLeft: '0',
  ['@media (max-width:374px)']: { // eslint-disable-line no-useless-computed-key
    fontSize: '0.7rem',
  },
},
extendedIcon: {
  marginRight: theme.spacing.unit,
},
marginBottom: {
  marginBottom: '2%',
}
});



class AdviceSelect extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Grid container spacing={12} className="advice-select-app">
        <Grid item xs={12}>
            <p>Are you associated with:</p>
          </Grid>
        <Grid item xs={4}>
            <Button onClick={this.props.handleAssociatedButton.bind(this,'batting')} value="batting" variant="outlined" className={classes.button}>Batting team</Button>
          </Grid>
        <Grid item xs={4} className={classes.marginBottom}>
          <Button variant="outlined" className={classes.button} onClick={this.props.handleAssociatedButton.bind(this,'bowling')} value="bowling" >Bowling team</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" className={classes.button} onClick={this.props.handleAssociatedButton.bind(this,'neutral')} value="neutral">Neutral</Button>
        </Grid>
      </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(AdviceSelect);
