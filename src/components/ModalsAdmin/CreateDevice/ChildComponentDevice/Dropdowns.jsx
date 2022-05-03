import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import CreateDeviceStore from "../../../../store/CreateDeviceStore";
import {CSSTransition} from "react-transition-group";
import './Dropdowns.css'
import {createDevice} from "../../../../pages/Admin";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FormHelperText} from "@mui/material";


const Dropdowns = observer(() => {
    const {device} = useContext(Context)
    // const [selectedTypeId, setSelectedTypeId] = useState(null)
    // const [selectedIdBr, setSelectedBrandId] = useState(null)
    useEffect(()=>{

    }, [createDevice.Brand])

    return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                <div style={{width:'100%'}} className={''}>
                    <div className={''}>
                        <FormControl style={{width:'80%'}}>
                            <InputLabel id="demo-simple-select-helper-label">Выберете тип</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={createDevice.getTypeId}
                                label="Age"
                            >

                                {device.BrandInType.map(type =>
                                    <MenuItem
                                        onClick={() =>{if(type.name!==createDevice.Type){
                                            createDevice.setType(type.name)
                                            createDevice.setBrand(null)
                                            createDevice.setTypeId(type.id)
                                        }
                                        }}
                                        value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/*<Dropdown  style={{width: '48%'}} className={"mt-2 mb-2 "}>*/}
                {/*    <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Type || 'Выберете тип'}</Dropdown.Toggle>*/}
                {/*    <Dropdown.Menu style={{width: '100%'}}>*/}
                {/*        {device.BrandInType.map(type =>*/}
                {/*            <Dropdown.Item*/}
                {/*                onClick={() =>{if(type.name!==createDevice.Type){*/}
                {/*                    createDevice.setType(type.name)*/}
                {/*                    createDevice.setBrand(null)*/}
                {/*                }*/}
                {/*                }}*/}
                {/*                key={type.name}>*/}
                {/*                {type.name}*/}
                {/*            </Dropdown.Item>*/}
                {/*        )}*/}
                {/*    </Dropdown.Menu>*/}
                {/*</Dropdown>*/}


                <CSSTransition
                    in={Boolean(createDevice.Type)}
                    timeout={1000}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <div  style={{visibility: Boolean(createDevice.Type), width:'100%'}} className={''}>
                        <div className={''}>
                            <FormControl style={{width:'80%'}}>
                                <InputLabel id="demo-simple-select-helper-label">Выберете бренд</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={createDevice.getBrandId}
                                    label="Age"
                                >

                                    {
                                        createDevice.Type !== null &&
                                        device.BrandInType.filter(unit => unit.name === createDevice.Type)[0].brands.map((el) => {
                                            return <MenuItem
                                                onClick={() => {createDevice.setBrand(el.name); createDevice.setBrandId(el.id)}}
                                                value={el.id}>
                                                {el.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                </CSSTransition>

                {/*<CSSTransition*/}
                {/*    in={Boolean(createDevice.Type)}*/}
                {/*    timeout={1000}*/}
                {/*    mountOnEnter={true}*/}
                {/*    unmountOnExit={true}*/}
                {/*>*/}
                {/*    {state => <Dropdown style={{width: '48%'}} className={`mt-2 mb-2 typeDropdown ${state}`}>*/}
                {/*        <Dropdown.Toggle style={{width: '100%'}}>{createDevice.Brand || 'Выберете бренд>'}</Dropdown.Toggle>*/}
                {/*        <Dropdown.Menu style={{width: '100%'}}>*/}
                {/*            {device.BrandInType.filter(unit => unit.name === createDevice.Type)[0].brands.map((el) => {*/}
                {/*                    return  <Dropdown.Item*/}
                {/*                        onClick={() => createDevice.setBrand(el.name)}*/}
                {/*                        key={el.id}>*/}
                {/*                        {el.name}*/}
                {/*                    </Dropdown.Item>*/}
                {/*                }*/}
                {/*            )}*/}
                {/*        </Dropdown.Menu>*/}
                {/*    </Dropdown>*/}

                {/*    }*/}

                {/*</CSSTransition>*/}



            </div>
    );
});

export default Dropdowns;