import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Button, Grid, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Context} from "../../../index";
import {Image} from "react-bootstrap";
import star from "../../../assets/svg/star.svg";
import './CardProduct.css'
import {Rating} from "@mui/material";
import {FaShoppingBasket} from "react-icons/fa";
import ModalDevice from "../../../pages/DevicePage/ComponentsForAdmin/ModalDeviceEdit";
import AlertDialog from "../AlertDialog/alert";
import OneDeviceStore from "../../../pages/DevicePage/OneDeviceStore";


const store = new OneDeviceStore()

export const ButtonBasket = observer(({id = null, price =null , classCust ='', color = 'primary'})=>{

    const {basket, user} = useContext(Context)

    function buttonClick(id, price) {

        basket.toggleBasket(id!==null? Number(id): id, price)
    }

    return <div>
        {
            basket.isBasketItem(Number(id)) ?
                <Button
                    variant="outlined"
                    color = {color}
                    className={classCust}
                    onClick={() => {
                        buttonClick(id, price)
                    }}
                >
                    <FaShoppingBasket/>
                </Button> :
                <Button
                    variant="contained"
                    color = {color}
                    className={classCust}
                    onClick={() => {
                        buttonClick(id, price)
                    }}
                >
                    <FaShoppingBasket/>
                </Button>
        }
    </div>


    // return  <Button
    //     variant="contained"
    //     color = {color}
    //     className={classCust}
    //     onClick={() => {
    //         buttonClick(id, price)
    //     }}
    // >
    //     {basket.isBasketItem(Number(id)) && 'Убрать из корзины'}
    //     {basket.isBasketItem(Number(id)) || <FaShoppingBasket/>}
    // </Button>
})
export const CardProduct = observer(({device}) => {
    const history = useHistory()
    const {basket, user} = useContext(Context)

    // const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [isDeleteDialogOpen, changeIsDeleteDialogOpen] = React.useState(false)

    function clickCard(e){
        history.push('/device/'+device.id)
    }

    function buttonClick(id, price) {
        basket.toggleBasket(id, price)
    }

    return (
        <div className={'card'}>
            <div className={'card__picture'}>
                <img src={!device.isName ? device.pathFile : (process.env.REACT_APP_API_URL+'takeImage/'+ device.pathFile) }/>
            </div>

            <div className={'card__priceRating'}>

                <Typography variant={'subtitle2'} className={'card__price'}>
                    {(Number(device.price)).toLocaleString() + ' '} ₽
                </Typography>
            </div>
            <div onClick={clickCard} className="card__name">
                <Typography variant={'body1'}>
                    {device.name.length>30 ?device.name.slice(0,30)+ ' ...' : device.name}
                </Typography>
            </div>
            <div className={'card__rating'}>
                <Rating name="read-only" value={Number(device.ratings)} readOnly />
            </div>


            {!user.isAuthAdmin ?
                <div className="card__button__wrapper">
                    <ButtonBasket id={device.id} price={device.price} classCust={'card__button'}/>
                </div>
                :
                <div>

                    {/*<div style={{width: "100%",*/}
                    {/*    display: "flex",*/}
                    {/*    justifyContent: "center"}}>*/}
                    {/*    <Button onClick={() => setOpen(true)} fullWidth={true} size={'large'}*/}
                    {/*            variant="outlined" color="primary">*/}
                    {/*        Изменить*/}
                    {/*    </Button>*/}
                    {/*</div>*/}



                    {/*<div style={{width: "100%",*/}
                    {/*    display: "flex",*/}
                    {/*    justifyContent: "center",*/}
                    {/*    marginTop: "5px"}}>*/}
                    {/*    <Button onClick={() => changeIsDeleteDialogOpen(true)} fullWidth={true}*/}
                    {/*            variant="outlined" size={'large'} color="primary">Удалить*/}
                    {/*    </Button>*/}
                    {/*</div>*/}


                    {/*<ModalDevice info={item} edit open={open} setOpen={setOpen} fishingData={fishingData}*/}
                    {/*             isLoading={store.isEditDeviceProcess}/>*/}

                    {/*<AlertDialog callback={dialogClose} questionText={'Вы действительно хотите удалить устройство'} isOpen={isDeleteDialogOpen} />*/}
                </div>
            }


        </div>
    )
})