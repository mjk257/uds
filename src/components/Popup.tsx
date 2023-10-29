import React, {ReactElement, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({ title, content, popupOpen, setPopupOpen } : Props) => {
    const handleClick = () => {
        if (popupOpen) {
            setPopupOpen(false);
        }
        else {
            setPopupOpen(true);
        }
    }

    const closeSx = { float: 'right' }

    return (
        <>
            <Dialog open={ popupOpen }
                    onClose={ handleClick }>
                <DialogTitle>
                    { title }
                    <IconButton onClick={ handleClick } sx={ { float: 'right' } }>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { content }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Popup;

type Props = {
    title: string,
    content: string | ReactElement,
    popupOpen: boolean,
    setPopupOpen: (isOpen: boolean) => void
};