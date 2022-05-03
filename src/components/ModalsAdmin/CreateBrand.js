import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {getTypeBrand, postBrand} from "../../http/UserApi";
import {Context} from "../../index";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {store} from "./DeleteWindows/storeDeleteBrand";

const CreateBrand = ({show, onHide}) => {


    const {device, user, taskInstance} = useContext(Context)
    const [typeSelected, setTypeSelected] = useState(null)
    const [brandSelected, setBrandSelected] = useState('')

    function sendToServer() {
        postBrand({name: brandSelected.trim(), type: typeSelected.name}).then(()=>{
            setBrandSelected('')
            taskInstance.createTask('Успешно добавлен бренд', 'success')
            device.setBrandInType()
            setTypeSelected(null)
        }).catch(({response})=>{

            if(response.data.info === 'Such Brand of this Type already exist'){
                taskInstance.createTask('Возникла какая-то ошибка', 'Danger')
            }

            if(response.data.status === 468){

                user.checkRefresh().then(()=>{
                    sendToServer()
                })
            }


        })

    }

    function closeWindow(){
        setTypeSelected(null)
        onHide()
    }

    return (
        <div>
            <Modal
                show={show}
                size="lg"
                onHide={onHide}
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить новый бренд
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>


                        {/*<Dropdown  style={{width: '100%'}} className={"mt-2 mb-2 "}>*/}
                        {/*    <Dropdown.Toggle style={{width: '100%'}}>{typeSelected || 'Выберете тип>'}</Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu style={{width: '100%'}}>*/}
                        {/*        {device.BrandInType.map(type =>*/}
                        {/*            <Dropdown.Item*/}
                        {/*                onClick={() => setTypeSelected(type.name)}*/}
                        {/*                key={type.name}>*/}
                        {/*                {type.name}*/}
                        {/*            </Dropdown.Item>*/}
                        {/*        )}*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        <div style={{marginBottom:'20px'}} className={'wrapperSelect'}>
                            <div className={'itemSelect'}>
                                <FormControl style={{width:'100%'}}>
                                    <InputLabel id="demo-simple-select-helper-label">Типы</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={typeSelected != null ? typeSelected.id : null}
                                        label="Age"
                                    >


                                        {device.BrandInType.map(type =>
                                            <MenuItem
                                                onClick={() => {setTypeSelected(type); console.log("typese", typeSelected)}}
                                                value={type.id}>
                                                {type.name}
                                            </MenuItem>
                                        )}


                                    </Select>

                                </FormControl>
                            </div>
                        </div>

                        {typeSelected &&
                            <Form.Control
                                placeholder={'Введите название бренда'}
                                value={brandSelected}
                                onChange={(e)=> setBrandSelected(e.target.value)}
                            >

                            </Form.Control>

                        }

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={closeWindow}>Закрыть</Button>
                    <Button disabled={!(brandSelected && typeSelected)} variant={'outline-success'} onClick={sendToServer}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateBrand;