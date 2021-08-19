import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { OuterNonrecognized } from './NonrecognizeAlertstyles';
import emoji from 'react-easy-emoji'


emoji('Emojis make me 😟')

const NonrecognizeAlert = () => {

    return (
        <React.Fragment >
            <OuterNonrecognized>
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