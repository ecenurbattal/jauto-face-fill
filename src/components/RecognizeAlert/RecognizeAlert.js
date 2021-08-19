import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { OuterRecognized } from './RecognizeAlertstyles';


// const useStyles = makeStyles(theme => ({
//     alignItemsAndJustifyContent: {
//         width: 500,
//         height: 80,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'pink',
//     },
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//             display: "flex",
//             align: "center",
//             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
//         },
//     },
// }));


const RecognizeAlert = () => {

    //const classes = useStyles();

    return (
        <OuterRecognized>
            <div>

                <Alert severity="success" >
                    <AlertTitle style={{alignItems:"center",justifyContent:"center"}}>Face Recognized.</AlertTitle>
                    <strong>Your personal information has been filled.</strong>
                </Alert>
            </div >
        </OuterRecognized>

    )


}


export default RecognizeAlert;