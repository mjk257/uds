import React, {ReactElement} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
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