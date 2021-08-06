import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles({
    root: {
        width: '100%',
        '& > * + *': {
            // marginTop: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        },
    },
});


const NonrecognizeAlert = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Alert severity="error" >
                <AlertTitle>Yüzünüzü Tanıyamadık :(</AlertTitle>
                <strong>Lütfen kişisel bilgiler formunu doldurunuz.</strong>
            </Alert>

        </div >



    );

}

export default NonrecognizeAlert;