import React, {useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Divider,
    Fade,
    Grid,
    Modal,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {FieldArray, Form, Formik, useField} from "formik";
import * as Yup from "yup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {PresentationComponentLoadLink} from "../ModalsAdmin/CreateDevice/ChildComponentDevice/LoadImage/LoadImageLink";
import LoadImageLocal from "../ModalsAdmin/CreateDevice/ChildComponentDevice/LoadImage/LoadImageLocal";
import {GrClose} from "react-icons/all";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
            inputCategory: {
                width: '100%',
            },
            buttonClose: {
                width: '50px',
                height: '70px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
        }
    )
)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    overflowY: 'auto',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const EditFio = observer( ({open, handleClose, firstName, lastName, middleName, getNewFio, isEditFio}) => {
    const classes = useStyles()


    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={open}>

                    <Box component={Paper}  sx={style}>


                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={isEditFio}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Backdrop
                                open={isEditFio}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </Modal>



                        <Box sx={{display: 'flex', justifyContent: 'space-between',}}>
                            <Typography id="transition-modal-title" variant="h4" component="h2">
                               ???????????????????????????? ??????????????
                            </Typography>

                            <Button onClick={handleClose}>
                                ??????????????
                            </Button>
                        </Box>

                        <Divider/>

                        <Box sx={{marginTop: '2rem'}}>
                            <Formik
                                initialValues={{
                                    firstName: firstName,
                                    lastName: lastName,
                                    middleName: middleName,
                                }}

                                validationSchema={
                                    Yup.object({
                                        firstName: Yup.string().max(15, '???????????? 15 ???????????????? ??????????????????').matches(/(^[\p{sc=Cyrillic}]+$)/ui, '???????????? ?????????????? ??????????, ?????? ????????????????').required('???????????? ????????'),
                                        lastName: Yup.string().max(20, '???????????? 20 ???????????????? ??????????????????').matches(/(^[\p{sc=Cyrillic}]+$)/ui, '???????????? ?????????????? ??????????, ?????? ????????????????').required('???????????? ????????'),
                                        middleName: Yup.string().max(20, '???????????? 20 ???????????????? ??????????????????').matches(/(^[\p{sc=Cyrillic}]+$)/ui, '???????????? ?????????????? ??????????, ?????? ????????????????').required('???????????? ????????'),
                                    })
                                }

                                onSubmit={(values, {setSubmitting}) => {

                                    let fio =  values.lastName + ' '+values.firstName +' '+values.middleName;
                                    getNewFio(fio)


                                }}
                            >
                                {({values, errors}) => (
                                    <Form>
                                        {/*{JSON.stringify(errors)}*/}
                                        <Box sx={{marginBottom: '1rem'}}>
                                            <InputDevice
                                                name={'firstName'}
                                                id={'firstName'}
                                                label="??????"
                                                className={classes.inputCategory}
                                            />
                                        </Box>


                                        <Box sx={{marginBottom: '1rem'}}>
                                            <InputDevice
                                                name={'lastName'}
                                                id={'lastName'}
                                                label="??????????????"
                                                className={classes.inputCategory}
                                            />
                                        </Box>


                                        <Box sx={{marginBottom: '1rem'}}>
                                            <InputDevice
                                                name={'middleName'}
                                                id={'middleName'}
                                                label="????????????????"
                                                className={classes.inputCategory}
                                            />
                                        </Box>





                                        <Box sx={{display:'flex', justifyContent: 'space-between', marginTop: '4rem'}}>
                                            <Button size={'large'} variant={"contained"} onClick={handleClose}>
                                                ????????????
                                            </Button>

                                            <Button  size={'large'} variant={'contained'} type={"submit"}>
                                                ??????????????????????????
                                            </Button>
                                        </Box>

                                    </Form>
                                )}
                            </Formik>
                        </Box>


                    </Box>
                </Fade>
            </Modal>
        </div>
    );
});


function InputDevice(props) {

    const [field, meta] = useField(props);

    return (
        <React.Fragment>
            <TextField
                error={meta.touched && meta.error}
                {...field}
                {...props}
                helperText={meta.error}
                variant="outlined"


            />
        </React.Fragment>

    )
}

export default EditFio;