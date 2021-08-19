import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { OuterRecognized } from './RecognizeAlertstyles';



const RecognizeAlert = () => {

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