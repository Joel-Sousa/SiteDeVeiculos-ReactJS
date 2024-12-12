import React from 'react'
import {Dialog, DialogActions, DialogTitle, Button} from '@material-ui/core'

export default function Confirm(props){
    const {open, title, onClose, onConfirm} = props
    
    return(
        <Dialog 
            open={open}
            onClose={() => onClose()}>
                <DialogTitle disableTypography><h6>{title || 'Tem certeza?'}</h6></DialogTitle>
                <DialogActions className="justify-content-center mb-2">
                    <Button onClick={() => {
                        onClose()
                        onConfirm()
                    }}
                    variant="contained"
                    color="primary">
                        Sim
                    </Button>
                    <Button onClick={() => onClose()}>
                        Nao
                    </Button>

                </DialogActions>
        </Dialog>
    )
}