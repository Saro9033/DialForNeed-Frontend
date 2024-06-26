import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { clearError, clearUpdated, editUser, isUpdated, loginAuthError, loginAuthUser, loginIsAuthenticated } from '../../slices/authSlice';
import avatarImg from '../../assets/avatar.png';
import './MyProfile.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Myprofile = () => {
    const { enqueueSnackbar } = useSnackbar();

    const user = useSelector(loginAuthUser);
    const IsUpdated = useSelector(isUpdated);
    const LoginAuthError = useSelector(loginAuthError)
    const isMobileView = window.innerWidth < 850;
    const LoginIsAuthenticated = useSelector(loginIsAuthenticated)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //updating profile
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [number, setNumber] = useState(user?.phoneNumber);

    const [postalCode, setPostalCode] = useState(user?.postalCode);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

    const dispatch = useDispatch()

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', number);
        formData.append('address', address);
        formData.append('postalCode', postalCode);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('avatar', avatar);
        dispatch(editUser(formData));
    }

const navigate = useNavigate()
    useEffect(()=>{
        if(IsUpdated){
            enqueueSnackbar("Profile updated successfully!", {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                onExited: () => {
                  dispatch(clearUpdated());
                },
              })
            return
        }
        if (LoginAuthError) {
            enqueueSnackbar(LoginAuthError, {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                onExited: () => {
                  dispatch(clearError());
                },
              })
        }
        if(!LoginIsAuthenticated && user?.role === "user" || !LoginIsAuthenticated && user?.role === "employee"){
            console.log(LoginIsAuthenticated)
            navigate('/')
        }
    },[IsUpdated, user, LoginAuthError, LoginIsAuthenticated, dispatch, enqueueSnackbar, navigate ])

    return (
        <div class="container " style={{ minHeight: '100vh', marginTop: isMobileView ? '15px' : '10px', }}>
           <MetaData title="My profile"/>
            <div class="main-body">
                <div class="row">
                    <div class={`${user?.role === "employee" ? 'col-lg-12' : 'col-lg-4'}`} >
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={user?.avatar || avatarImg} alt="Admin" style={{ objectFit: 'cover', width: '100px', height: '100px' }} class="rounded-circle p-1 bg-primary" />
                                    <div class="mt-3">
                                        <h4>{user?.name}</h4>
                                        <p class="text-secondary mb-1">{user?.email}</p>
                                        {user?.role === "employee" &&  <p class="text-secondary mb-1">{user?.phoneNumber}</p> }
                                       {user?.role !== "employee" ?
                                        <div className='d-flex w-100 align-items-center justify-content-around'>
                                            <Link to='/my-orders'className="w-100 mt-2 btn btn-outline-primary">Orders</Link>
                                        </div> :
                                          <div className='d-flex w-100 align-items-center justify-content-around'>
                                          <Link to='/my-tasks'className="w-100 mt-2 btn btn-outline-primary">Tasks</Link>
                                      </div>
                                        }
                                    </div>
                                </div>
                                <hr class="my-4" />

                            </div>
                        </div>
                    </div>
                  {user?.role !== "employee" &&  <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">

                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.phoneNumber} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.address} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Postal Code</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.postalCode} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">City</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.city} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Country</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <input type="text" class="form-control" value={user?.country} />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"></div>
                                    <div class="col-sm-9 text-secondary">
                                        <button onClick={handleShow} class="btn btn-primary px-4" >Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>}
                </div>
            </div>


            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                <Modal.Body>
                    
                        <div className="personal-image">
                            <label className="label">
                                <input type="file" name="avatar" />
                                <figure className="personal-figure">
                                    <img onChange={onChangeAvatar} src={avatarPreview} className="personal-avatar" alt="avatar" />
                                    <figcaption className="personal-figcaption">
                                        <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="camera icon" />
                                    </figcaption>
                                </figure>
                            </label>
                        </div>
                        <Form.Group controlId="formName" >
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" value={name} />
                        </Form.Group> <br />
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
                        </Form.Group> <br />
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control onChange={(e) => setNumber(e.target.value)} type="text" value={number} />
                        </Form.Group> <br />
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
                        </Form.Group> <br />
                        <Form.Group controlId="formPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control onChange={(e) => setPostalCode(e.target.value)} type="text" value={postalCode} />
                        </Form.Group> <br />
                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={(e) => setCity(e.target.value)} type="text" value={city} />
                        </Form.Group> <br />
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control onChange={(e) => setCountry(e.target.value)} type="text" value={country} />
                        </Form.Group> <br />
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </div>


    );
}

export default Myprofile

