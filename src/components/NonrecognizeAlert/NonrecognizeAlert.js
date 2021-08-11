import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
//import { Box } from '@material-ui/core'
import { OuterNonrecognized } from './NonrecognizeAlertstyles';
// import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import emoji from 'react-easy-emoji'

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


emoji('Emojis make me 😟')

const NonrecognizeAlert = () => {

    //const classes = useStyles();
    return (
        <React.Fragment >
            <OuterNonrecognized>
                {/* <Box
                    display="flex"
                    width={500} height={80}
                    bgcolor="lightgreen"
                    alignItems="center"
                    justifyContent="center"
                >
                    2. Box (alignItems and justifyContent)
                </Box> */}
                <div>

                    <Alert severity="error" >
                        <AlertTitle style={{alignItems:"center",justifyContent:"center"}}>We couldn't recognize your face {emoji('😟')} </AlertTitle>
                        <strong>Please fill in the personal info form.</strong>
                    </Alert>

                </div >
            </OuterNonrecognized>

        </React.Fragment>



    );

}

export default NonrecognizeAlert;